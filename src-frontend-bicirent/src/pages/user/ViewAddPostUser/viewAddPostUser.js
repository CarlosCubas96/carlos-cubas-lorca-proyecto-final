import React, { useState, useEffect } from "react";
import Header from "../../../components/common/layout/header/header";
import authService from "../../../services/auth/auth.service";
import Form from "react-validation/build/form";
import './viewAddPostUser.css';
import FormButton from "../../../components/UI/Button/FormButton/formButton";
import CheckBoxFormInput from "../../../components/UI/inputs/CheckboxFormInput/checkboxFormInput";
import PostService from "../../../services/post/post.service";
import SelectFormInput from "../../../components/UI/inputs/SelectFormInput/selectFormInput";
import TextAreaFormInput from "../../../components/UI/inputs/TextAreaFormInput/textAreaFormInput";
import Icon from "../../../components/UI/icon/icon";
import AddFormInput from "../../../components/UI/inputs/AddFormInput/addFormInput";

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
    const [currentUser, setCurrentUser] = useState(undefined);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [categories, setCategories] = useState([]);
    const [newPost, setNewPost] = useState({
        category: { id: null },
        owner: { id: null },
        description: '',
        otherDetails: '',
        postStatus: '',
        postName: '',
        tags: []
    });

    const [message, setMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [newTag, setNewTag] = useState("");

    useEffect(() => {
        const user = authService.getCurrentUser();
        if (user && user.roles.includes('ROLE_USER')) {
            setCurrentUser(user);
            setNewPost(prevState => ({
                ...prevState,
                owner: { id: user.id } 
            }));
            getAllCategories();
        }
    }, []);

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
                setMessage("Publicación creada exitosamente!");
                setErrorMessage(null);
            })
            .catch(error => {
                setErrorMessage("Error al crear la Publicación. Inténtalo de nuevo." + error);
                setMessage(null);
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

    const handleGoBack = () => {
        window.history.back();
    };
    return (
        <div className="admin-dashboard-main-container">
            <div className="admin-dashboard-main-dash-board-main-admin">
                <Header currentUser={currentUser} />
                <div className="admin-dashboard-main-containerdashboardadmin">
                    <div className="admin-dashboard-main-containerdashboardsections">
                        <div className="dash-board-edit-post-user-containermainsection">
                            <div className="dash-board-profile-admin-containermainsectiontitle">
                                <div className="dash-board-profile-admin-containersectiontitle">
                                    <span className="dash-board-profile-admin-text">
                                        <span>Gestión de Publicación</span>
                                    </span>
                                </div>
                                <button style={{ border: 'none', background: 'inherit' }} onClick={handleGoBack}>
                                    <Icon name="ArrowExit" size="30px"></Icon>
                                </button>
                            </div>

                            <Form className="dash-board-edit-post-admin-containermainsectioneditprofile">
                                <div className="dash-board-edit-post-admin-containermainsectionshield">
                                    <AddFormInput
                                        label="Nombre de la Publicación"
                                        type="text"
                                        name="postName"
                                        value={newPost.postName}
                                        onChange={onChange}
                                        validations={[required, vpostName]}
                                    />
                                </div>
                                <div className="dash-board-edit-post-admin-containermainsectionselect">
                                    <SelectFormInput
                                        label="Selecciona una categoría:"
                                        name="category"
                                        value={selectedCategory}
                                        onChange={handleChangeCategory}
                                        categories={categories}
                                        validations={[required]}
                                    />
                                </div>
                                <div className="dash-board-edit-post-admin-containermainsectionshield1">
                                    <TextAreaFormInput
                                        label="Descripción"
                                        name="description"
                                        value={newPost.description}
                                        onChange={onChange}
                                        validations={[required, vdescription]}
                                    />
                                </div>
                                <div className="dash-board-edit-post-admin-containermainsectionshield2">
                                    <TextAreaFormInput
                                        label="Detalles Adicionales"
                                        name="otherDetails"
                                        value={newPost.otherDetails}
                                        onChange={onChange}
                                        validations={[required, votherDetails]}
                                    />
                                </div>
                                <div className="dash-board-edit-post-admin-containermainsectionshield3">
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
                                <div className="dash-board-edit-post-admin-containermainsectionshield3">
                                    <CheckBoxFormInput
                                        label="Estado del Alquiler"
                                        name="postStatus"
                                        options={[
                                            { value: 'DISPONIBLE', label: 'Disponible' },
                                            { value: 'ALQUILADO', label: 'Alquilado' },
                                            { value: 'NODISPONIBLE', label: 'No Disponible' }
                                        ]}
                                        selectedValue={newPost.postStatus}
                                        onChange={onChange}
                                        validations={[required]}
                                    />
                                </div>
                            </Form>
                            <div className="dash-board-edit-post-admin-containermainsectionbuttoms">
                                <FormButton color="#F5F5F5" onClick={handleCreatePost}>Crear</FormButton>
                                {message && <div className="form-group">
                                    <div className="edit-containermessage-message">
                                        {message}
                                    </div>
                                </div>}
                                {errorMessage && <div className="form-group">
                                    <div className="edit-containererror-message">
                                        {errorMessage}
                                    </div>
                                </div>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewAddPostUser;
