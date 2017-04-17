package gr.bus_tracker.driver_app.models;

import android.content.Context;
import android.content.SharedPreferences;
import android.content.res.Resources;
import android.util.Log;

import com.strongloop.android.loopback.AccessToken;
import com.strongloop.android.loopback.RestAdapter;
import com.strongloop.android.loopback.UserRepository;
import com.strongloop.android.loopback.callbacks.ObjectCallback;
import com.strongloop.android.loopback.callbacks.VoidCallback;
import com.strongloop.android.remoting.JsonUtil;
import com.strongloop.android.remoting.adapters.Adapter;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.HashMap;

import gr.bus_tracker.driver_app.DriverApplication;
import gr.bus_tracker.driver_app.R;

/**
 * Created by nick on 4/2/17.
 */

public class AppUserRepository extends UserRepository<AppUser> {
	protected AppUser cachedCurrentUser;
	private String DRIVER_ROLE;
	private Object currentUserId;
	private boolean isCurrentUserIdLoaded;

	public AppUserRepository() {
		super(AppUser.NAME, AppUser.class);
	}

	public void registerUser(final String email, final String username, final String password, final ObjectCallback<AppUser> appUserObjectCallback) {
		final AppUser newUser = createObject(new HashMap());
		newUser.setEmail(email);
		newUser.setUsername(username);
		newUser.setPassword(password);

		newUser.save(new VoidCallback() {
			@Override
			public void onSuccess() {
				appUserObjectCallback.onSuccess(newUser);
			}

			@Override
			public void onError(Throwable t) {
				appUserObjectCallback.onError(t);
			}
		});
	}

	public void loginUser(HashMap<String, Object> params, final LoginCallback<AppUser> callback) {
		if (DRIVER_ROLE == null) { // not initialized yet
			Resources res = getRestAdapter().getApplicationContext().getResources();
			DRIVER_ROLE = res.getString(R.string.driverRole);
		}

		if (params == null) {
			params = new HashMap<>();
		}
		params.put("loginAsRole",  DRIVER_ROLE); // request login with specific role.
		invokeStaticMethod("login", params, new Adapter.JsonObjectCallback() {
			@Override
			public void onError(Throwable t) {
				callback.onError(t);
			}

			@Override
			public void onSuccess(JSONObject response) {
				final RestAdapter adapter = getRestAdapter();
				final DriverApplication app = (DriverApplication)adapter.getApplicationContext();
				AccessToken token = app.getAccessTokenRepository()
						.createObject(JsonUtil.fromJson(response));
				adapter.setAccessToken(token.getId().toString());

				JSONObject userJson = response.optJSONObject("user");
				AppUser user = userJson != null
						? createObject(JsonUtil.fromJson(userJson))
						: null;

				setCurrentUserId(token.getUserId());
				cachedCurrentUser = user;
				callback.onSuccess(token, user);
			}
		});
	}

	/**
	 * @return Id of the currently logged in user. null when there is no user logged in.
	 */
	public Object getCurrentUserId() {
		loadCurrentUserIdIfNotLoaded();
		return currentUserId;
	}

	protected void setCurrentUserId(Object currentUserId) {
		this.currentUserId = currentUserId;
		cachedCurrentUser = null;
		saveCurrentUserId();
	}

	private void saveCurrentUserId() {
		final SharedPreferences.Editor editor = getSharedPreferences().edit();
		final String json = new JSONArray().put(getCurrentUserId()).toString();
		editor.putString(PROPERTY_CURRENT_USER_ID, json);
		editor.apply();
	}

	/**
	 * Fetch the data of the currently logged in user. Invokes
	 * {@code callback.onSuccess(null)} when no user is logged in.
	 * The data is cached, see {@link #getCachedCurrentUser()}
	 * @param callback success/error callback
	 */
	public void findCurrentUser(final ObjectCallback<AppUser> callback) {
		if (getCurrentUserId() == null) {
			callback.onSuccess(null);
			return;
		}

		this.findById(getCurrentUserId(), new ObjectCallback<AppUser>() {
			@Override
			public void onSuccess(AppUser user) {
				cachedCurrentUser = user;
				callback.onSuccess(user);
			}

			@Override
			public void onError(Throwable t) {
				callback.onError(t);
			}
		});
	}

	public AppUser getCachedCurrentUser() {
		return cachedCurrentUser;
	}

	private SharedPreferences getSharedPreferences() {
		return getApplicationContext().getSharedPreferences(
				SHARED_PREFERENCES_NAME,
				Context.MODE_PRIVATE);
	}

	private void loadCurrentUserIdIfNotLoaded() {
		if (isCurrentUserIdLoaded) return;
		isCurrentUserIdLoaded = true;

		String json = getSharedPreferences().getString(PROPERTY_CURRENT_USER_ID, null);
		if (json == null) return;

		try {
			Object id = new JSONArray(json).get(0);
			setCurrentUserId(id);
		} catch (JSONException e) {
			String msg = "Cannot parse current user id '" + json + "'";
			Log.e("LoopBack", msg, e);
		}
	}
}
