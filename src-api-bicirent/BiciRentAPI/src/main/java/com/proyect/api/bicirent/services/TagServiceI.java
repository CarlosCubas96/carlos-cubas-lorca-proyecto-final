package com.proyect.api.bicirent.services;

import java.util.List;

import com.proyect.api.bicirent.models.Post;
import com.proyect.api.bicirent.models.Tag;

public interface TagServiceI {

	Post addTagToPost(Long postId, Tag tag);

	Post removeTagFromPost(Long postId, Long tagId);

	List<Tag> getAllTags();
}
