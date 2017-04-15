package gr.bus_tracker.driver_app;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.widget.EditText;
import android.widget.TextView;

import gr.bus_tracker.driver_app.models.AppUser;
import gr.bus_tracker.driver_app.models.AppUserRepository;

public class UserAreaActivity extends AppCompatActivity {
	// Repositories/Models
	private AppUserRepository appUserRepo;

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_user_area);

		// get needed models
		final DriverApplication app = (DriverApplication)getApplication();
		appUserRepo = app.getAppUserRepository();

		final TextView tvWelcome = (TextView) findViewById(R.id.tvWelcome);

		AppUser currentUser = appUserRepo.getCachedCurrentUser();
		String username = currentUser.getUsername();
		String message = "Hello " + username + "!";
		tvWelcome.setText(message);
	}
}
