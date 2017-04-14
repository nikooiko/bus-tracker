package gr.bus_tracker.driver_app.models;

import com.strongloop.android.loopback.UserRepository;
import com.strongloop.android.loopback.callbacks.ObjectCallback;
import com.strongloop.android.loopback.callbacks.VoidCallback;

import java.util.HashMap;

/**
 * Created by nick on 4/2/17.
 */

public class AppUserRepository extends UserRepository<AppUser> {
	public AppUserRepository() {
		super("AppUser", AppUser.class);
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
}
