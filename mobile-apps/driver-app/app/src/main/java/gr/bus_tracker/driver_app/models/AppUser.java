package gr.bus_tracker.driver_app.models;

import com.google.android.gms.maps.model.LatLng;
import com.strongloop.android.loopback.User;

import org.json.JSONObject;

import java.util.ArrayList;

/**
 * Created by nick on 4/2/17.
 */

public class AppUser extends User {
	private LatLng location;
	private JSONObject relations;
	private ArrayList<String> roles;

	public LatLng getLocation() {
		return location;
	}

	public void setLocation(LatLng location) {
		this.location = location;
	}

	public JSONObject getRelations() {
		return relations;
	}

	public void setRelations(JSONObject relations) {
		this.relations = relations;
	}

	public ArrayList<String> getRoles() {
		return roles;
	}

	public void setRoles(ArrayList<String> roles) {
		this.roles = roles;
	}

	public boolean hasRole(String sRole) {
		for (String role: roles) {
			if (role.equals(sRole)) return true;
		}
		return false;
	}
}
