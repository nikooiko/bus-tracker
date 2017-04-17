package gr.bus_tracker.driver_app.models;

import com.strongloop.android.loopback.ModelRepository;

/**
 * Created by nick on 4/17/17.
 */

public class RouteRepository extends ModelRepository<Route> {
	public RouteRepository() {
		super(Route.NAME, Route.class);
	}
}
