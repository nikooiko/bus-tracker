package gr.bus_tracker.driver_app;

import android.content.Intent;
import android.content.res.Resources;
import android.os.Bundle;
import android.support.v7.app.AlertDialog;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;

import com.strongloop.android.loopback.callbacks.ObjectCallback;

import gr.bus_tracker.driver_app.models.AppUser;
import gr.bus_tracker.driver_app.models.AppUserRepository;

public class RegisterActivity extends AppCompatActivity {
	// Resources
	private String TOAST_MESSAGE;

	// Properties
	private AppUserRepository appUserRepo;
	private EditText etEmail;
	private EditText etUsername;
	private EditText etPassword;
	private EditText etRepeatPassword;
	private Button btnRegister;

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_register);
		Resources res = getResources();

		// get needed models
		final DriverApplication app = (DriverApplication)getApplication();
		appUserRepo = app.getAppUserRepository();

		// get all needed resources
		TOAST_MESSAGE = res.getString(R.string.toastMessage);

		// init properties
		etEmail = (EditText) findViewById(R.id.etEmail);
		etUsername = (EditText) findViewById(R.id.etUsername);
		etPassword = (EditText) findViewById(R.id.etPassword);
		etRepeatPassword = (EditText) findViewById(R.id.etRepeatPassword);
		btnRegister = (Button) findViewById(R.id.btnRegister);

		setupRegister();
	}

	private void setupRegister() {
		btnRegister.setOnClickListener(new View.OnClickListener() {
			@Override
			public void onClick(View v) {
				RegisterActivity.this.sendRegisterRequest();
			}
		});
	}

	private void sendRegisterRequest() {
		// Get input fields
		final String email = etEmail.getText().toString();
		final String username = etUsername.getText().toString();
		final String password = etPassword.getText().toString();
		final String repeatPassword = etRepeatPassword.getText().toString();
		if (!password.equals(repeatPassword)) { // if passwords don't match
			// TODO send error passwords dont match
			return;
		}
		// Send the request
		appUserRepo.registerUser(email, username, password, registerCallback());
	}

	private ObjectCallback<AppUser> registerCallback() {
		return new ObjectCallback<AppUser>() {
			@Override
			public void onSuccess(AppUser user) {
				Intent intent = new Intent(RegisterActivity.this, LoginActivity.class);
				intent.putExtra("username", user.getUsername());
				intent.putExtra("password", user.getPassword());
				intent.putExtra(TOAST_MESSAGE, "Registered successfully!");
				RegisterActivity.this.startActivity(intent);
			}

			@Override
			public void onError(Throwable t) {
				AlertDialog.Builder builder = new AlertDialog.Builder(RegisterActivity.this);
				builder.setMessage("Register Failed, Throwable t: " + t)
						.setNegativeButton("Retry", null)
						.create()
						.show();
			}
		};
	}
}
