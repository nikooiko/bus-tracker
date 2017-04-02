package gr.bus_tracker.driver_app;

import android.support.annotation.NonNull;

import com.android.volley.Response;
import com.android.volley.toolbox.StringRequest;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by nick on 4/2/17.
 */

public class RegisterRequest extends StringRequest {
	private static final String REGISTER_REQUEST_URL = "http://localhost:3000/api/AppUser/Register";
	private Map<String, String> params;

	public RegisterRequest(String username, String password, Response.Listener<String> listener, Response.ErrorListener errorListener) {
		super(Method.POST, REGISTER_REQUEST_URL, listener, errorListener);
		params = new HashMap<>();
		params.put("username", username);
		params.put("password", password);
	}

	@Override
	public Map<String, String> getParams() {
		return params;
	}
}
