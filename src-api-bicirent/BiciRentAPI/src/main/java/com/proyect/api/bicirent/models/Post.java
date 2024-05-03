package com.proyect.api.bicirent.models;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "BR_POSTS")
public class Post {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "POST_ID")
	private Long id;

	@ManyToOne
	@JoinColumn(name = "OWNER_USER_ID", nullable = false)
	private User owner;

	@ManyToOne
	@JoinColumn(name = "CATEGORY_ID", nullable = false)
	private Category category;

	@Column(name = "DESCRIPTION", nullable = false, length = 255)
	private String description;

	@Column(name = "POST_NAME", nullable = false, length = 255)
	private String postName;

	@Enumerated(EnumType.STRING)
	@Column(name = "POST_STATUS", nullable = false, length = 50)
	private PostStatus postStatus;

	@Column(name = "CREATION_DATE", nullable = false)
	private LocalDate creationDate;

	@Column(name = "OTHER_DETAILS", length = 500)
	private String otherDetails;

	@ManyToMany
	@JoinTable(name = "BR_POSTS_TAGS", joinColumns = @JoinColumn(name = "POST_ID"), inverseJoinColumns = @JoinColumn(name = "TAG_ID"))
	private Set<Tag> tags = new HashSet<>();

	public Post() {

	}

	public Post(String postName, String description, PostStatus postStatus, LocalDate creationDate, String otherDetails,
			User owner, Category category) {
		this.postName = postName;
		this.description = description;
		this.owner = owner;
		this.category = category;
		this.postStatus = postStatus;
		this.creationDate = creationDate;
		this.otherDetails = otherDetails;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public User getOwner() {
		return owner;
	}

	public void setOwner(User owner) {
		this.owner = owner;
	}

	public Category getCategory() {
		return category;
	}

	public void setCategory(Category category) {
		this.category = category;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getPostName() {
		return postName;
	}

	public void setPostName(String postName) {
		this.postName = postName;
	}

	public PostStatus getPostStatus() {
		return postStatus;
	}

	public void setPostStatus(PostStatus postStatus) {
		this.postStatus = postStatus;
	}

	public LocalDate getCreationDate() {
		return creationDate;
	}

	public void setCreationDate(LocalDate creationDate) {
		this.creationDate = creationDate;
	}

	public String getOtherDetails() {
		return otherDetails;
	}

	public void setOtherDetails(String otherDetails) {
		this.otherDetails = otherDetails;
	}

	public Set<Tag> getTags() {
		return tags;
	}

	public void setTags(Set<Tag> tags) {
		this.tags = tags;
	}

	@Override
	public String toString() {
		return "Post [getId()=" + getId() + ", getOwner()=" + getOwner() + ", getCategory()=" + getCategory()
				+ ", getDescription()=" + getDescription() + ", getPostName()=" + getPostName() + ", getPostStatus()="
				+ getPostStatus() + ", getCreationDate()=" + getCreationDate() + ", getOtherDetails()="
				+ getOtherDetails() + ", getTags()=" + getTags() + "]";
	}

}
