package gr.bus_tracker.driver_app.auth;

import android.app.ProgressDialog;
import android.content.Intent;
import android.os.Bundle;
import android.support.design.widget.TextInputLayout;
import android.support.v7.app.AppCompatActivity;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import com.strongloop.android.loopback.AccessToken;
import com.strongloop.android.loopback.callbacks.VoidCallback;

import org.apache.http.client.HttpResponseException;

import java.util.ArrayList;
import java.util.HashMap;

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
	@BindView(R.id.etUsernameLayout) TextInputLayout etUsernameLayout;
	@BindView(R.id.etPasswordLayout) TextInputLayout etPasswordLayout;
	@BindView(R.id.etUsername) EditText etUsername;
	@BindView(R.id.etPassword) EditText etPassword;
	@BindView(R.id.btnLogin) Button btnLogin;
	@BindView(R.id.tvRegister) TextView tvRegister;

	// Other properties
	private ProgressDialog progressDialog;

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_login);
		ButterKnife.bind(this);

		// get needed models
		final DriverApplication app = (DriverApplication)getApplication();
		appUserRepo = app.getAppUserRepository();

		// enable error handlers to avoid layout changes.
		etUsernameLayout.setErrorEnabled(true);
		etPasswordLayout.setErrorEnabled(true);

		// check if intent contains username and password
		Intent intent = getIntent();
		String username = intent.getStringExtra("username");
		if (username != null) etUsername.setText(username);
		String password = intent.getStringExtra("password");
		if (password != null) etPassword.setText(password);

		// check if intent contains toast message
		String toastMsg = intent.getStringExtra(TOAST_MESSAGE);
		Toast.makeText(this, toastMsg, Toast.LENGTH_SHORT).show();

		// init progress dialog
		progressDialog = new ProgressDialog(LoginActivity.this, R.style.Theme_Design_Light_BottomSheetDialog);
		progressDialog.setIndeterminate(true);
		progressDialog.setMessage("Authenticating...");
		progressDialog.setCancelable(false);
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
		if (!hasFocus) validateUsername();
	}

	@OnTextChanged(R.id.etUsername)
	void onUsernameChange() {
		validateUsername();
	}

	@OnFocusChange(R.id.etPassword)
	void onPasswordFocusChange(boolean hasFocus) {
		if (!hasFocus) validatePassword();
	}

	@OnTextChanged(R.id.etPassword)
	void onPasswordChange() {
		validatePassword();
	}

	@OnClick(R.id.btnLogin)
	void onLogin() {
		// One last validation in case somehow bypassed validators
		validateUsername(false);
		validatePassword(false);
		updateLoginBtn();
		// continue only if after previous actions button is still enabled
		if (!btnLogin.isEnabled()) return;

		// Get input fields
		final String username = etUsername.getText().toString();
		final String password = etPassword.getText().toString();
		// Send the request
		HashMap<String, Object> params = new HashMap<String, Object>();
		params.put("username",  username);
		params.put("password",  password);

		beforeLogin();
		appUserRepo.loginUser(params, new AppUserRepository.LoginCallback<AppUser>() {
			@Override
			public void onSuccess(AccessToken token, AppUser currentUser) {
				LoginActivity.this.onLoginSuccess(token, currentUser);
			}

			@Override
			public void onError(Throwable t) {
				LoginActivity.this.onLoginFailed(t);
			}
		});
	}

	private void validateUsername() {
		validateUsername(true);
	}

	private void validateUsername(boolean shouldUpdate) {
		String username = etUsername.getText().toString();
		if (TextInputUtils.isNullOrEmpty(username)) {
			etUsernameLayout.setError(REQUIRED_ERROR);
		} else {
			etUsernameLayout.setError(null);
		}
		if (shouldUpdate) updateLoginBtn();
	}

	private void validatePassword() {
		validatePassword(true);
	}

	private void validatePassword(boolean shouldUpdate) {
		String password = etPassword.getText().toString();
		if (TextInputUtils.isNullOrEmpty(password)) {
			etPasswordLayout.setError(REQUIRED_ERROR);
		} else {
			etPasswordLayout.setError(null);
		}
		if (shouldUpdate) updateLoginBtn();
	}

	private void updateLoginBtn() {
		boolean inputError = false;
		if (etUsernameLayout.getError() != null) inputError = true;
		if (etPasswordLayout.getError() != null) inputError = true;
		btnLogin.setEnabled(!inputError); // if no error then enable btn
	}

	private void beforeLogin() {
		btnLogin.setEnabled(false);
		progressDialog.show();
	}

	private void afterLogin() {
		btnLogin.setEnabled(true);
		progressDialog.dismiss();
	}

	private void failNotDriverLogout() {
		String toastMsg = "Login Failed. You are not a driver!";
		Toast.makeText(LoginActivity.this, toastMsg, Toast.LENGTH_SHORT).show();
		afterLogin();
	}

	private void onLoginSuccess(AccessToken token, AppUser currentUser) {
		ArrayList<String> roles = (ArrayList<String>) token.getCreationParameters().get("roles");
		currentUser.setRoles(roles);
		if (currentUser.hasRole(DRIVER_ROLE)) {
			Intent intent = new Intent(LoginActivity.this, UserAreaActivity.class);
			LoginActivity.this.startActivity(intent);
			afterLogin();
		} else { // just a failsafe
			appUserRepo.logout(new VoidCallback() {
				@Override
				public void onSuccess() {
					failNotDriverLogout();
				}

				@Override
				public void onError(Throwable t) {
					failNotDriverLogout();
				}
			});
		}
	}

	private void onLoginFailed(Throwable t) {
		boolean handled = false;
		if (t instanceof HttpResponseException) {
			HttpResponseException httpEx = (HttpResponseException)t;
			if (httpEx.getStatusCode() == 403) {
				String toastMsg = "Login Failed. You are not a driver!";
				Toast.makeText(LoginActivity.this, toastMsg, Toast.LENGTH_SHORT).show();
				handled = true;
			}
		}
		if (!handled) {
			String toastMsg = "Login Failed!";
			Toast.makeText(LoginActivity.this, toastMsg, Toast.LENGTH_SHORT).show();
		}
		afterLogin();
	}
}
