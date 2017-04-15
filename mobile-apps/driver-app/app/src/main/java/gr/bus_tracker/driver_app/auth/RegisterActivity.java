package gr.bus_tracker.driver_app.auth;

import android.content.Intent;
import android.os.Bundle;
import android.support.design.widget.TextInputLayout;
import android.support.v7.app.AlertDialog;
import android.support.v7.app.AppCompatActivity;
import android.widget.Button;
import android.widget.EditText;

import com.strongloop.android.loopback.callbacks.ObjectCallback;

import butterknife.BindString;
import butterknife.BindView;
import butterknife.ButterKnife;
import butterknife.OnClick;
import butterknife.OnFocusChange;
import butterknife.OnTextChanged;
import gr.bus_tracker.driver_app.DriverApplication;
import gr.bus_tracker.driver_app.R;
import gr.bus_tracker.driver_app.models.AppUser;
import gr.bus_tracker.driver_app.models.AppUserRepository;
import gr.bus_tracker.driver_app.utils.TextInputUtils;

public class RegisterActivity extends AppCompatActivity {
	// Repositories/Models
	private AppUserRepository appUserRepo;

	// Resources
	@BindString(R.string.toastMessage) String TOAST_MESSAGE;
	@BindString(R.string.requiredError) String REQUIRED_ERROR;
	@BindString(R.string.emailError) String EMAIL_ERROR;
	@BindString(R.string.usernameError) String USERNAME_ERROR;
	@BindString(R.string.passwordError) String PASSWORD_ERROR;
	@BindString(R.string.repeatPasswordError) String REPEAT_PASSWORD_ERROR;

	// Fields
	@BindView(R.id.etEmailLayout) TextInputLayout etEmailLayout;
	@BindView(R.id.etUsernameLayout) TextInputLayout etUsernameLayout;
	@BindView(R.id.etPasswordLayout) TextInputLayout etPasswordLayout;
	@BindView(R.id.etRepeatPasswordLayout) TextInputLayout etRepeatPasswordLayout;
	@BindView(R.id.etEmail) EditText etEmail;
	@BindView(R.id.etUsername) EditText etUsername;
	@BindView(R.id.etPassword) EditText etPassword;
	@BindView(R.id.etRepeatPassword) EditText etRepeatPassword;
	@BindView(R.id.btnRegister) Button btnRegister;

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_register);
		ButterKnife.bind(this);

		// get needed models
		final DriverApplication app = (DriverApplication)getApplication();
		appUserRepo = app.getAppUserRepository();

		// enable error handlers to avoid layout changes.
		etEmailLayout.setErrorEnabled(true);
		etUsernameLayout.setErrorEnabled(true);
		etPasswordLayout.setErrorEnabled(true);
		etRepeatPasswordLayout.setErrorEnabled(true);
	}

	@OnFocusChange(R.id.etEmail)
	void onEmailFocusChange(boolean hasFocus) {
		if (!hasFocus) validateEmail();
	}

	@OnTextChanged(R.id.etEmail)
	void onEmailChange() {
		validateEmail();
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

	@OnFocusChange(R.id.etRepeatPassword)
	void onRepeatPasswordFocusChange(boolean hasFocus) {
		if (!hasFocus) validateRepeatPassword();
	}

	@OnTextChanged(R.id.etRepeatPassword)
	void onRepeatPasswordChange() {
		validateRepeatPassword();
	}

	@OnClick(R.id.btnRegister)
	void onRegister() {
		// One last validation in case somehow bypassed validators
		validateEmail(false);
		validateUsername(false);
		validatePassword(false);
		validateRepeatPassword(false);
		updateRegisterBtn();
		// continue only if after previous actions buttonn is still enabled
		if (!btnRegister.isEnabled()) return;

		// Get input fields
		final String email = etEmail.getText().toString();
		final String username = etUsername.getText().toString();
		final String password = etPassword.getText().toString();

		// Send the request
		appUserRepo.registerUser(email, username, password, registerCallback());
	}

	private void validateEmail() {
		validateEmail(true);
	}

	private void validateEmail(boolean shouldUpdate) {
		String email = etEmail.getText().toString();
		if (TextInputUtils.isNullOrEmpty(email)) {
			etEmailLayout.setError(REQUIRED_ERROR);
		} else if (!TextInputUtils.isValidEmail(email)) {
			etEmailLayout.setError(EMAIL_ERROR);
		} else {
			etEmailLayout.setError(null);
		}
		if (shouldUpdate) updateRegisterBtn();
	}

	private void validateUsername() {
		validateUsername(true);
	}

	private void validateUsername(boolean shouldUpdate) {
		String username = etUsername.getText().toString();
		if (TextInputUtils.isNullOrEmpty(username)) {
			etUsernameLayout.setError(REQUIRED_ERROR);
		} else if (!TextInputUtils.isValidUsername(username)) {
			etUsernameLayout.setError(USERNAME_ERROR);
		} else {
			etUsernameLayout.setError(null);
		}
		if (shouldUpdate) updateRegisterBtn();
	}

	private void validatePassword() {
		validatePassword(true);
	}

	private void validatePassword(boolean shouldUpdate) {
		String password = etPassword.getText().toString();
		if (TextInputUtils.isNullOrEmpty(password)) {
			etPasswordLayout.setError(REQUIRED_ERROR);
		} else if (!TextInputUtils.isValidPassword(password)) {
			etPasswordLayout.setError(PASSWORD_ERROR);
		} else {
			etPasswordLayout.setError(null);
		}
		validateRepeatPassword(false); // also validate repeat password
		if (shouldUpdate) updateRegisterBtn();
	}

	private void validateRepeatPassword() {
		validateRepeatPassword(true);
	}

	private void validateRepeatPassword(boolean shouldUpdate) {
		String password = etPassword.getText().toString();
		String repeatPassword = etRepeatPassword.getText().toString();
		if (TextInputUtils.isNullOrEmpty(repeatPassword)) {
			etRepeatPasswordLayout.setError(REQUIRED_ERROR);
		} else if (TextInputUtils.isNullOrEmpty(password) || !repeatPassword.equals(password)) {
			etRepeatPasswordLayout.setError(REPEAT_PASSWORD_ERROR);
		} else {
			etRepeatPasswordLayout.setError(null);
		}
		if (shouldUpdate) updateRegisterBtn();
	}

	private void updateRegisterBtn() {
		boolean inputError = false;
		if (etEmailLayout.getError() != null) inputError = true;
		if (etUsernameLayout.getError() != null) inputError = true;
		if (etPasswordLayout.getError() != null) inputError = true;
		if (etRepeatPasswordLayout.getError() != null) inputError = true;
		btnRegister.setEnabled(!inputError); // if no error then enable btn
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
