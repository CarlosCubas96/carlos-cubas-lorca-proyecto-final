package com.proyect.api.bicirent.models;

import java.io.IOException;

import org.springframework.core.io.Resource;

public class ImageResource {
	private String url;

	public ImageResource(Resource resource) throws IOException {
		this.url = resource.getURL().toString();
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}
}