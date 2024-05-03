package com.proyect.api.bicirent.models;

import jakarta.persistence.*;

@Entity
@Table(name = "BR_TAGS")
public class Tag {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "TAG_ID")
	private Long id;

	@Column(name = "TAG_NAME", nullable = false, length = 50)
	private String tagName;

	public Tag() {
	}

	public Tag(String tagName) {
		this.tagName = tagName;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getTagName() {
		return tagName;
	}

	public void setTagName(String tagName) {
		this.tagName = tagName;
	}
}
