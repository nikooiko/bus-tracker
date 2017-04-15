package gr.bus_tracker.driver_app.auth;

import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AlertDialog;
import android.support.v7.app.AppCompatActivity;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import com.strongloop.android.loopback.AccessToken;

import java.util.ArrayList;

import butterknife.BindString;
import butterknife.BindView;
import butterknife.ButterKnife;
import butterknife.OnClick;
import butterknife.OnFocusChange;
import butterknife.OnTextChanged;
import gr.bus_tracker.driver_app.DriverApplication;
import gr.bus_tracker.driver_app.R;
import gr.bus_tracker.driver_app.UserAreaActivity;
import gr.bus_tracker.driver_app.models.AppUser;
import gr.bus_tracker.driver_app.models.AppUserRepository;
import gr.bus_tracker.driver_app.utils.TextInputUtils;

public class LoginActivity extends AppCompatActivity {
	// Repositories/Models
	private AppUserRepository appUserRepo;

	// Resources
	@BindString(R.string.driverRole) String DRIVER_ROLE;
	@BindString(R.string.toastMessage) String TOAST_MESSAGE;
	@BindString(R.string.requiredError) String REQUIRED_ERROR;

	// Fields
	@BindView(R.id.etUsername) EditText etUsername;
	@BindView(R.id.etPassword) EditText etPassword;
	@BindView(R.id.btnLogin) Button btnLogin;
	@BindView(R.id.tvRegister) TextView tvRegister;

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_login);
		ButterKnife.bind(this);

		// get needed models
		final DriverApplication app = (DriverApplication)getApplication();
		appUserRepo = app.getAppUserRepository();

		// check if intent contains username and password
		Intent intent = getIntent();
		String username = intent.getStringExtra("username");
		if (username != null) etUsername.setText(username);
		String password = intent.getStringExtra("password");
		if (password != null) etPassword.setText(password);

		// check if intent contains toast message
		String toastMsg = intent.getStringExtra(TOAST_MESSAGE);
		Toast.makeText(LoginActivity.this, toastMsg, Toast.LENGTH_SHORT).show();
	}

	@Override
	public void onBackPressed() {
		// disable going back to the MainActivity
		moveTaskToBack(true);
	}

	@OnClick(R.id.tvRegister)
	void onGotoRegister() {
		Intent registerIntent = new Intent(this, RegisterActivity.class);
		startActivity(registerIntent);
	}

	@OnFocusChange(R.id.etUsername)
	void onUsernameFocusChange(boolean hasFocus) {
		if (!hasFocus) LoginActivity.this.validateUsername();
	}

	@OnTextChanged(R.id.etUsername)
	void onUsernameChange() {
		LoginActivity.this.validateUsername();
	}

	@OnFocusChange(R.id.etPassword)
	void onPasswordFocusChange(boolean hasFocus) {
		if (!hasFocus) LoginActivity.this.validatePassword();
	}

	@OnTextChanged(R.id.etPassword)
	void onPasswordChange() {
		LoginActivity.this.validatePassword();
	}

	@OnClick(R.id.btnLogin)
	void onLogin() {
		// One last validation in case somehow bypassed validators
		validateUsername(false);
		validatePassword(false);
		updateLoginBtn();
		// continue only if after previous actions buttonn is still enabled
		if (!btnLogin.isEnabled()) return;

		// Get input fields
		final String username = etUsername.getText().toString();
		final String password = etPassword.getText().toString();
		// Send the request
		appUserRepo.loginUser(username, password, loginCallback(username));
	}

	private void validateUsername() {
		validateUsername(true);
	}

	private void validateUsername(boolean shouldUpdate) {
		String username = etUsername.getText().toString();
		if (TextInputUtils.isNullOrEmpty(username)) {
			etUsername.setError(REQUIRED_ERROR);
		} else {
			etUsername.setError(null);
		}
		if (shouldUpdate) LoginActivity.this.updateLoginBtn();
	}

	private void validatePassword() {
		validatePassword(true);
	}

	private void validatePassword(boolean shouldUpdate) {
		String password = etPassword.getText().toString();
		if (TextInputUtils.isNullOrEmpty(password)) {
			etPassword.setError(REQUIRED_ERROR);
		} else {
			etPassword.setError(null);
		}
		if (shouldUpdate) LoginActivity.this.updateLoginBtn();
	}

	private void updateLoginBtn() {
		boolean inputError = false;
		if (etUsername.getError() != null) inputError = true;
		if (etPassword.getError() != null) inputError = true;
		btnLogin.setEnabled(!inputError); // if no error then enable btn
	}

	private AppUserRepository.LoginCallback<AppUser> loginCallback(final String username) {
		return new AppUserRepository.LoginCallback<AppUser>() {
			@Override
			public void onSuccess(AccessToken token, AppUser currentUser) {
				ArrayList<String> roles = (ArrayList<String>) token.getCreationParameters().get("roles");
				currentUser.setRoles(roles);
				if (currentUser.hasRole(DRIVER_ROLE)) {
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
			}

			@Override
			public void onError(Throwable t) {
				AlertDialog.Builder builder = new AlertDialog.Builder(LoginActivity.this);
				builder.setMessage("Login Failed, Throwable t: " + t)
						.setNegativeButton("Retry", null)
						.create()
						.show();
			}
		};
	}
}
