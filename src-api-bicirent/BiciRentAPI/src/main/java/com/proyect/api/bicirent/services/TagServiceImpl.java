package com.proyect.api.bicirent.services;

import com.proyect.api.bicirent.models.Post;
import com.proyect.api.bicirent.models.Tag;
import com.proyect.api.bicirent.repository.PostRepository;
import com.proyect.api.bicirent.repository.TagRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.Set;

@Service
public class TagServiceImpl implements TagServiceI {

    private final PostRepository postRepository;
    private final TagRepository tagRepository;

    public TagServiceImpl(PostRepository postRepository, TagRepository tagRepository) {
        this.postRepository = postRepository;
        this.tagRepository = tagRepository;
    }

    // Método para agregar una etiqueta a un post
    @Override
    public Post addTagToPost(Long postId, Tag tag) {
        Optional<Post> optionalPost = postRepository.findById(postId);
        if (optionalPost.isPresent()) {
            Post post = optionalPost.get();
            Set<Tag> tags = post.getTags();
            tags.add(tag);
            post.setTags(tags);
            tagRepository.save(tag); // Guardar el tag en la base de datos
            return postRepository.save(post);
        } else {
            throw new IllegalArgumentException("Post not found with id: " + postId);
        }
    }

    // Método para eliminar una etiqueta de un post
    @Override
    public Post removeTagFromPost(Long postId, Long tagId) {
        Optional<Post> optionalPost = postRepository.findById(postId);
        if (optionalPost.isPresent()) {
            Post post = optionalPost.get();
            Set<Tag> tags = post.getTags();
            tags.removeIf(tag -> tag.getId().equals(tagId));
            post.setTags(tags);
            return postRepository.save(post);
        } else {
            throw new IllegalArgumentException("Post not found with id: " + postId);
        }
    }
}
