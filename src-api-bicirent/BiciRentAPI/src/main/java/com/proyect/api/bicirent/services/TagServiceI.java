package com.proyect.api.bicirent.services;

import com.proyect.api.bicirent.models.Post;
import com.proyect.api.bicirent.models.Tag;

public interface TagServiceI {

	Post addTagToPost(Long postId, Tag tag);

	Post removeTagFromPost(Long postId, Long tagId);
}
