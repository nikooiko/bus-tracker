package gr.bus_tracker.driver_app;

import android.os.Bundle;
import android.support.v7.app.ActionBar;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.Spinner;
import android.widget.TextView;

import com.strongloop.android.loopback.callbacks.ListCallback;

import java.util.List;

import butterknife.BindString;
import butterknife.BindView;
import butterknife.ButterKnife;
import butterknife.OnClick;
import gr.bus_tracker.driver_app.core.BaseActivity;
import gr.bus_tracker.driver_app.models.AppUser;
import gr.bus_tracker.driver_app.models.AppUserRepository;
import gr.bus_tracker.driver_app.models.Route;
import gr.bus_tracker.driver_app.models.RouteRepository;

public class UserAreaActivity extends BaseActivity {
	private final String TAG = "UserAreaActivity";

	// Repositories/Models
	private RouteRepository routeRepository;

	// Resources
	@BindString(R.string.userAreaTitle) String TITLE;

	// Fields
	@BindView(R.id.tvWelcome) TextView tvWelcome;
	@BindView(R.id.sRoutes) Spinner sRoutes;
	@BindView(R.id.btnLogout) Button btnLogout;

	// Properties

	// Constructors
	public UserAreaActivity() {
		super(R.layout.activity_user_area);
	}

	// Methods
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		ButterKnife.bind(this);

		// get needed models
		final DriverApplication app = (DriverApplication)getApplication();
		routeRepository = app.getRouteRepository();

		AppUser currentUser = appUserRepo.getCachedCurrentUser();
		String username = currentUser.getUsername();
		String message = "Hello " + username + "!";
		tvWelcome.setText(message);

		// Init Routes Spinner
		routeRepository.findAll(new ListCallback<Route>() {
			@Override
			public void onSuccess(List<Route> routes) {
				ArrayAdapter<Route> dataAdapter
						= new ArrayAdapter<>(UserAreaActivity.this, android.R.layout.simple_spinner_item, routes);
				dataAdapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);

				sRoutes.setAdapter(dataAdapter);
				sRoutes.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
					@Override
					public void onItemSelected(AdapterView<?> parent, View view, int position, long id) {
						parent.getItemAtPosition(position);
						// TODO with selection
					}

					@Override
					public void onNothingSelected(AdapterView<?> parent) {

					}
				});
			}

			@Override
			public void onError(Throwable t) {
				// TODO
			}
		});

		// Update action bar
		ActionBar actionBar = getSupportActionBar();
		actionBar.setTitle(TITLE);
	}

	@Override
	public void onBackPressed() {
		// disable going back to the MainActivity
		moveTaskToBack(true);
	}

	@OnClick(R.id.btnLogout)
	void onLogout() {
		Log.d(TAG, "Clicked logout");
	}
}
