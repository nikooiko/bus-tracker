package gr.bus_tracker.driver_app;

import android.content.Intent;
import android.content.res.Resources;
import android.os.Bundle;
import android.support.v7.app.AlertDialog;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.Volley;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

public class LoginActivity extends AppCompatActivity {
	// Resources
	private String DRIVER_ROLE;
	private String LOGIN_URL;
	// Properties
	private RequestQueue queue;
	private EditText etUsername;
	private EditText etPassword;
	private Button btnLogin;
	private TextView tvRegister;

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_login);
		Resources res = getResources();
		// get all needed resources
		DRIVER_ROLE = res.getString(R.string.driverRole);
		LOGIN_URL = res.getString(R.string.loginURL);

		// init properties
		queue = Volley.newRequestQueue(LoginActivity.this);
		etUsername = (EditText) findViewById(R.id.etUsername);
		etPassword = (EditText) findViewById(R.id.etPassword);
		btnLogin = (Button) findViewById(R.id.btnLogin);
		tvRegister = (TextView) findViewById(R.id.tvRegister);

		setupRegister();
		setupLogin();
	}

	private void setupLogin() {
		btnLogin.setOnClickListener(new View.OnClickListener() {
			@Override
			public void onClick(View v) {
				LoginActivity.this.sendLoginRequest();
			}
		});
	}

	private void setupRegister() {
		tvRegister.setOnClickListener(new View.OnClickListener() {
			@Override
			public void onClick(View v) {
				Intent registerIntent = new Intent(LoginActivity.this, RegisterActivity.class);
				LoginActivity.this.startActivity(registerIntent);
			}
		});
	}

	private void sendLoginRequest() {
		final String username = etUsername.getText().toString();
		final String password = etPassword.getText().toString();

		try {
			// Create the login request
			JsonObjectRequest loginRequest = createLoginRequest(username, password);
			// Add the request to the queue
			queue.add(loginRequest);
		} catch (JSONException e) {
			e.printStackTrace();
		}
	}

	private JsonObjectRequest createLoginRequest(String username, String password) throws JSONException {
		// Create json object with the provided fields
		JSONObject jsonData = new JSONObject();
		jsonData.put("username", username);
		jsonData.put("password", password);

		return new JsonObjectRequest(Request.Method.POST, LOGIN_URL, jsonData, onLoginSuccess(username), onLoginFail());
	}

	private Response.Listener<JSONObject> onLoginSuccess(final String username) {
		return new Response.Listener<JSONObject>() {
			@Override
			public void onResponse(JSONObject jsonResponse) {
				try {
					// Get roles field in order to check if user is driver
					JSONArray roles = jsonResponse.getJSONArray("roles");
					boolean isDriver = false;
					String role;
					for (int i = 0; i < roles.length(); i++) {
						role = roles.getString(i);
						if (role.equals(LoginActivity.this.DRIVER_ROLE)) {
							isDriver = true;
						}
					}
					if (isDriver) {
						Intent intent = new Intent(LoginActivity.this, UserAreaActivity.class);
						intent.putExtra("username", username);
						LoginActivity.this.startActivity(intent);
					} else {
						AlertDialog.Builder builder = new AlertDialog.Builder(LoginActivity.this);
						builder.setMessage("Login Failed. You are not a driver!")
								.setNegativeButton("Retry", null)
								.create()
								.show();
					}
				} catch (JSONException e) {
					e.printStackTrace();
				}
			}
		};
	}

	private Response.ErrorListener onLoginFail() {
		return new Response.ErrorListener() {
			@Override
			public void onErrorResponse(VolleyError error) {
				AlertDialog.Builder builder = new AlertDialog.Builder(LoginActivity.this);
				builder.setMessage("Login Failed, error: " + error)
						.setNegativeButton("Retry", null)
						.create()
						.show();
			}
		};
	}
}
