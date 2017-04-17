package gr.bus_tracker.driver_app.models;

import android.content.Context;
import android.support.annotation.IdRes;
import android.support.annotation.LayoutRes;
import android.support.annotation.NonNull;
import android.widget.ArrayAdapter;

/**
 * Created by nick on 4/17/17.
 */

public class RouteListAdapter extends ArrayAdapter<Route> {
	public RouteListAdapter(@NonNull Context context, @LayoutRes int resource, @IdRes int textViewResourceId) {
		super(context, resource, textViewResourceId);
	}
}
