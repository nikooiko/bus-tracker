package gr.bus_tracker.driver_app;

import android.app.Application;
import android.content.res.Resources;

import com.strongloop.android.loopback.RestAdapter;

import gr.bus_tracker.driver_app.models.AppUserRepository;

/**
 * Created by nick on 4/2/17.
 */

public class DriverApplication extends Application {
	RestAdapter adapter;
	AppUserRepository appUserRepository;

	@Override
	public void onCreate() {
		super.onCreate();
		Resources res = getResources();
		final String API_URL = res.getString(R.string.apiURL);
		adapter = new RestAdapter(getApplicationContext(), API_URL);
		appUserRepository = adapter.createRepository(AppUserRepository.class);
	}

	public RestAdapter getLoopBackAdapter() {
		return adapter;
	}

	public AppUserRepository getAppUserRepository() {
		return appUserRepository;
	}
}
