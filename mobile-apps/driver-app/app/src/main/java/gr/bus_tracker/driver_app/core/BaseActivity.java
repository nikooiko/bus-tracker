package gr.bus_tracker.driver_app.core;

import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.Menu;
import android.view.MenuItem;

import gr.bus_tracker.driver_app.DriverApplication;
import gr.bus_tracker.driver_app.R;
import gr.bus_tracker.driver_app.models.AppUser;
import gr.bus_tracker.driver_app.models.AppUserRepository;

/**
 * Created by nick on 5/20/17.
 */

public class BaseActivity extends AppCompatActivity {
	// Repositories/Models
	protected AppUserRepository appUserRepo;

	// Properties
	protected int layout;

	// Constructors
	public BaseActivity(int layout) {
		super();
		this.layout = layout;
	}

	// Methods
	@Override
	protected void onCreate(@Nullable Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(this.layout);

		Toolbar myToolbar = (Toolbar) findViewById(R.id.custom_action_bar);
		setSupportActionBar(myToolbar);

		// get needed models
		final DriverApplication app = (DriverApplication)getApplication();
		this.appUserRepo = app.getAppUserRepository();
	}

	@Override
	public boolean onCreateOptionsMenu(Menu menu) {
		AppUser currentUser = appUserRepo.getCachedCurrentUser();

		if (currentUser != null) { // means logged in
			getMenuInflater().inflate(R.menu.auth, menu);
		} else { // no logged in user
			getMenuInflater().inflate(R.menu.unauth, menu);
		}
		return true;
	}

	@Override
	public boolean onOptionsItemSelected(MenuItem item) {
		switch(item.getItemId()) {
			case R.id.about:
//				Toast.makeText(this, R.string.about_toast, Toast.LENGTH_LONG).show();
				return(true);
			case R.id.exit:
				finish();
				return(true);
		}
		return(super.onOptionsItemSelected(item));
	}
}
