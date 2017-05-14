package gr.bus_tracker.driver_app.models;

import com.google.android.gms.maps.model.LatLng;
import com.strongloop.android.loopback.Model;

/**
 * Created by nick on 4/17/17.
 */

public class Route extends Model {
	public static final String NAME = "Route";

	private String name;
	private String description;
	private Boolean isOfficial;
	private LatLng source;
	private LatLng destination;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Boolean getOfficial() {
		return isOfficial;
	}

	public void setOfficial(Boolean official) {
		isOfficial = official;
	}

	public LatLng getSource() {
		return source;
	}

	public void setSource(LatLng source) {
		this.source = source;
	}

	public LatLng getDestination() {
		return destination;
	}

	public void setDestination(LatLng destination) {
		this.destination = destination;
	}

	@Override
	public String toString() {
		return name;
	}
}
