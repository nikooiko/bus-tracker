package gr.bus_tracker.driver_app.models;

import com.strongloop.android.loopback.UserRepository;

/**
 * Created by nick on 4/2/17.
 */

public class AppUserRepository extends UserRepository<AppUser> {
	public AppUserRepository() {
		super("AppUser", AppUser.class);
	}
}
