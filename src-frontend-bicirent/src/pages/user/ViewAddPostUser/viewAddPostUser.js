import React, { useState, useEffect } from "react";
import authService from "../../../services/auth/auth.service";
import Form from "react-validation/build/form";
import './viewAddPostUser.css';
import FormButton from "../../../components/UI/Button/FormButton/formButton";
import PostService from "../../../services/post/post.service";
import SelectFormInput from "../../../components/UI/inputs/SelectFormInput/selectFormInput";
import TextAreaFormInput from "../../../components/UI/inputs/TextAreaFormInput/textAreaFormInput";
import Icon from "../../../components/UI/icon/icon";
import AddFormInput from "../../../components/UI/inputs/AddFormInput/addFormInput";
import { Link } from "react-router-dom";

const required = (value) => {
    if (!value || value.trim() === "") {
        return (
            <div className="login-text-error">
                ¡Este campo es obligatorio!
            </div>
        );
    }
};

const vpostName = (value) => {
    if (!value || value.trim() === "" || value.length < 3 || value.length > 50) {
        return (
            <div className="login-text-error">
                El nombre de la publicación debe tener entre 3 y 50 caracteres.
            </div>
        );
    }
};

const vdescription = (value) => {
    if (!value || value.trim() === "" || value.length < 10 || value.length > 200) {
        return (
            <div className="login-text-error">
                La descripción debe tener entre 10 y 200 caracteres.
            </div>
        );
    }
};

const votherDetails = (value) => {
    if (!value || value.trim() === "" || value.length < 10 || value.length > 200) {
        return (
            <div className="login-text-error">
                Los detalles adicionales deben tener entre 10 y 200 caracteres.
            </div>
        );
    }
};

const ViewAddPostUser = () => {
    const [selectedCategory, setSelectedCategory] = useState("");
    const [categories, setCategories] = useState([]);
    const [newPost, setNewPost] = useState({
        id: null,
        category: { id: null },
        owner: { id: null },
        description: '',
        otherDetails: '',
        postStatus: '',
        postName: '',
        tags: []
    });

    const [errorMessage, setErrorMessage] = useState(null);
    const [newTag, setNewTag] = useState("");
    const [isPostCreated, setIsPostCreated] = useState(false);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const user = authService.getCurrentUser();
        if (user) {
            setNewPost(prevState => ({
                ...prevState,
                owner: { id: user.id },
                postStatus: "DISPONIBLE"
            }));
            getAllCategories();

            if (categories.length > 0) {
                setSelectedCategory(categories[0].id);
                setNewPost(prevState => ({
                    ...prevState,
                    category: { id: categories[0].id }
                }));
            }
        }
    }, [categories]);

    const onChange = (e) => {
        const { name, value } = e.target;
        if (name === "category") {
            handleChangeCategory(e);
        } else {
            setNewPost(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };

    const getAllCategories = () => {
        PostService.getAllCategories()
            .then(response => {
                setCategories(response);
            })
            .catch(error => {
                console.error("Error fetching categories:", error);
            });
    }

    const handleChangeCategory = (e) => {
        const selectedCategoryId = e.target.value;
        setSelectedCategory(selectedCategoryId);
        setNewPost(prevState => ({
            ...prevState,
            category: { id: selectedCategoryId }
        }));
    };

    const handleCreatePost = () => {
        PostService.createPost(newPost)
            .then(response => {
                setNewPost(prevState => ({ ...prevState, id: response.id }));
                setErrorMessage(null);
                setIsPostCreated(true);
            })
            .catch(error => {
                setErrorMessage("Error al crear la Publicación. Inténtalo de nuevo." + error);
            });
    };

    const handleAddTag = (e) => {
        e.preventDefault();
        if (newTag) {
            const tag = { tagName: newTag };
            setNewTag("");
            setNewPost(prevState => ({
                ...prevState,
                tags: [...prevState.tags, tag]
            }));
        }
    };

    const handleRemoveTag = (tagName) => {
        setNewPost(prevState => ({
            ...prevState,
            tags: prevState.tags.filter(tag => tag.tagName !== tagName)
        }));
    };


    const toggleModal = () => {
        setShowModal(!showModal);
    };

    return (
        <div className="view-add-post-user-container">
            <div className="view-add-post-user-view-add-post-user">
                <div className="view-add-post-user-containersectionsprogress">
                    <div className="view-add-post-user-containerprogressbuttomclose">
                        <div className="view-add-post-user-containerbuttomtext">
                            <Link to="/" >
                                <Icon name={"Close"} size="30px"></Icon>
                            </Link>
                        </div>
                    </div>
                    <div className="view-add-post-user-containerprogress">
                        <div className="view-add-post-user-containerprogresstitle">
                            <span className="view-add-post-user-text">
                                <span>Pasos 1/2</span>
                            </span>
                        </div>
                        <div className="view-add-post-user-containerprogressbar">
                            <div className="view-add-post-user-depth6-frame0"></div>
                            <div className="view-add-post-user-depth6-frame1"></div>
                        </div>
                    </div>
                    <div className="view-add-post-user-containerbuttomprofilesave">
                        <FormButton textColor="#FFFFFF" color="#121417" onClick={toggleModal}>Ayuda</FormButton>
                    </div>
                </div>
                <div className="view-add-post-user-containerdashboardadmin">
                    <div className="view-add-post-user-containerdashboardsections">
                        <div className="view-add-post-user-containermainsection">
                            <div className="view-add-post-user-containermainsectiontitle">
                                <div className="view-add-post-user-containersectiontitle">
                                    <span className="view-add-post-user-text04">
                                        <span>Añadir Publicación</span>
                                    </span>
                                </div>
                            </div>
                            <Form className="view-add-post-user-containermainsectioneditprofile">
                                <div className="view-add-post-user-containermainsectionshield">
                                    <AddFormInput
                                        label="Nombre de la Publicación"
                                        type="text"
                                        name="postName"
                                        value={newPost.postName}
                                        onChange={onChange}
                                        validations={[required, vpostName]}
                                        placeholder="Escribe aquí el nombre de la publicacion"
                                        disabled={false}
                                    />
                                </div>
                                <div className="view-add-post-user-containermainsectionselect">
                                    <SelectFormInput
                                        label="Selecciona una categoría:"
                                        name="category"
                                        value={selectedCategory}
                                        onChange={handleChangeCategory}
                                        categories={categories}
                                        validations={[required]}
                                        disabled={false}
                                    />

                                </div>
                                <div className="view-add-post-user-containermainsectionshield1">
                                    <TextAreaFormInput
                                        label="Descripción"
                                        name="description"
                                        value={newPost.description}
                                        onChange={onChange}
                                        validations={[required, vdescription]}
                                        placeholder="Escribe aquí tu descripción" 
                                        disabled={false} 
                                    />

                                </div>
                                <div className="view-add-post-user-containermainsectionshield2">
                                    <TextAreaFormInput
                                        label="Detalles Adicionales"
                                        name="otherDetails"
                                        value={newPost.otherDetails}
                                        onChange={onChange}
                                        validations={[required, votherDetails]}
                                        placeholder="Escribe aquí otros detalles"
                                        disabled={false}
                                    />
                                </div>
                                <div className="view-add-post-user-containermainsectionshield3">
                                    <div className="dash-board-edit-post-admin-containersectionshield3">
                                        <div className="dash-board-edit-post-admin-containershield3">
                                            <div className="dash-board-edit-post-admin-containersectiontaglabel">
                                                <span className="dash-board-edit-post-admin-text09">
                                                    <span>Etiquetas</span>
                                                </span>
                                                <div>
                                                    <div className="dash-board-edit-post-admin-containersectiontagconttadd">
                                                        <input className="dash-board-edit-post-admin-containersectiontagcaddinput"
                                                            type="text"
                                                            placeholder="Añadir Nueva Etiqueta"
                                                            value={newTag}
                                                            onChange={(e) => setNewTag(e.target.value)}
                                                        />
                                                        <button className="dash-board-edit-post-admin-containersectiontagcaddbuttom" onClick={handleAddTag}>Agregar</button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="dash-board-edit-post-admin-containersectiontagmain">
                                                <div className="dash-board-edit-post-admin-containersectiontag">
                                                    <div className="dash-board-edit-post-admin-inputtag">
                                                        {newPost.tags.map((tag, index) => (
                                                            <div key={index} className="dash-board-edit-post-admin-containersectiontag1">
                                                                <div className="dash-board-edit-post-admin-containertagname">
                                                                    <div className="dash-board-edit-post-admin-tagname">
                                                                        <span className="dash-board-edit-post-admin-text11">
                                                                            <span>{tag.tagName}</span>
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                                <button className="dash-board-edit-post-admin-containertagclose" onClick={() => handleRemoveTag(tag.tagName)}>
                                                                    <Icon name="Close" size="20px"></Icon>
                                                                </button>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Form>
                        </div>
                    </div>
                </div>
                <div className="view-add-post-user-containersectionsprogress1">
                    {errorMessage && <div className="form-group">
                        <div className="edit-containererror-message">
                            {errorMessage}
                        </div>
                    </div>}
                    {isPostCreated && (
                        <FormButton textColor="#FFFFFF" color="#121417" to={`/user/publicaciones/add/bicicleta/${newPost.id}`} >Siguiente</FormButton>
                    )}
                    {!isPostCreated && (
                        <FormButton textColor="#FFFFFF" color="#121417" onClick={handleCreatePost}>Confirmar</FormButton>
                    )}
                </div>
            </div>
            {showModal && (
                <div className="modal fade show" tabIndex="-1" style={{ display: "block" }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Ayuda para Añadir Publicación</h5>
                                <button type="button" className="btn-close" onClick={toggleModal}></button>
                            </div>
                            <div className="modal-body">
                                <ul>
                                    <li>Asegúrate de completar todos los campos obligatorios.</li>
                                    <li>El nombre de la publicación debe tener entre 3 y 50 caracteres.</li>
                                    <li>La descripción debe tener entre 10 y 200 caracteres.</li>
                                    <li>Los detalles adicionales deben proporcionar información relevante.</li>
                                    <li>Selecciona una categoría apropiada para tu publicación.</li>
                                    <li>Utiliza etiquetas relevantes para mejorar la búsqueda de tu publicación.</li>
                                </ul>
                            </div>
                            <div className="modal-footer">

                                <FormButton textColor="#FFFFFF" color="#121417" onClick={toggleModal}>Cerrar</FormButton>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ViewAddPostUser;
