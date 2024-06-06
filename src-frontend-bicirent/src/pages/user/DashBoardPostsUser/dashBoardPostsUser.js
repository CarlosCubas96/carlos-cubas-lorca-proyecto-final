import React, { Component } from "react";

import './dashBoardPostsUser.css';
import Header from "../../../components/common/layout/header/header";
import Icon from "../../../components/UI/icon/icon";
import FormButtom from "../../../components/UI/Button/FormButton/formButton";
import ModalDelete from "../../../components/UI/Modal/ModalDelete/modalDelete";
import authService from "../../../services/auth/auth.service";
import PostService from "../../../services/post/post.service";
import { Link } from "react-router-dom";

export default class DashBoardPostsUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentUser: undefined,
            posts: [],
            searchQuery: '',
            currentPage: 0,
            totalPages: 0,
            showDeleteModal: false,
            postToDeleteId: null,
        };
    }

    componentDidMount() {
        const user = authService.getCurrentUser();
        if (user && user.roles.includes('ROLE_USER')) {
            this.setState({
                currentUser: user,
            }, () => {
                this.retrievesPosts();
            });
        }
    }

    onChangeSearchQuery(e) {
        const searchQuery = e.target.value;
        this.setState({
            searchQuery: searchQuery,
            currentPage: 0
        }, () => {
            this.retrievesPosts();
        });
    }

    handlePageChange(pageNumber) {
        this.setState({
            currentPage: pageNumber
        }, () => {
            this.retrievesPosts();
        });
    }

    retrievesPosts() {
        const { searchQuery, currentPage, currentUser } = this.state;
        const pageSize = 6;
        if (currentUser) {
            PostService.getAllPostsByUserId(currentUser.id, searchQuery, currentPage, pageSize)
                .then(data => {
                    this.setState({
                        posts: data.content,
                        totalPages: data.totalPages
                    });
                })
                .catch(error => {
                    console.error('Error fetching posts:', error);
                });
        }
    }

    handleDeletePost(id) {
        this.setState({
            showDeleteModal: true,
            postToDeleteId: id
        });

    }

    confirmDeletePost = () => {
        const { postToDeleteId } = this.state;
        PostService.deletePost(postToDeleteId)
            .then(() => {
                this.setState(prevState => ({
                    posts: prevState.posts.filter(post => post.id !== postToDeleteId),
                    showDeleteModal: false,
                    postToDeleteId: null
                }), () => {
                    this.retrievesPosts();
                });
            })
            .catch(error => {
                console.error('Error deleting post:', error);
            });
    }



    handleGoBack = () => {
        window.history.back();
    };

    formatDate(dateArray) {
        if (Array.isArray(dateArray) && dateArray.length === 3) {
            const [year, month, day] = dateArray;
            const formattedMonth = month.toString().padStart(2, '0');
            const formattedDay = day.toString().padStart(2, '0');
            return `${formattedDay}/${formattedMonth}/${year}`;
        } else {
            return "Formato de fecha inválido";
        }
    }


    render() {
        const { currentUser, posts, searchQuery, currentPage, totalPages, showDeleteModal } = this.state;

        return (
            <div className="dash-board-posts-user-container">
                <div className="dash-board-posts-user-dash-board-posts-user">
                    <Header currentUser={currentUser} />
                    <div className="dash-board-posts-user-containerdashboardadmin">
                        <div className="dash-board-posts-user-containerdashboardsections">
                            <div className="dash-board-posts-user-containermainsection">
                                <div className="dash-board-posts-user-containermainsectiontitle">
                                    <div className="dash-board-posts-user-containersectionbuttomback">
                                        <Link to="/user" >
                                            <Icon name="ArrowExit" size="30px"></Icon>
                                        </Link>
                                    </div>
                                    <div className="dash-board-posts-user-containersectiontitle">
                                        <span className="dash-board-posts-user-text12">
                                            <span>Mis Publicaciones</span>
                                        </span>
                                    </div>
                                </div>
                                <div className="dash-board-posts-user-containermainsectionsearch-box">
                                    <div className="dash-board-posts-user-containersectionsearch-box">
                                        <Icon name="Lupa" color="#637887" />
                                        <input
                                            type="text"
                                            placeholder="Buscar publicaciones por nombre de publicación "
                                            className="admin-dashboard-posts-sectioninputsearch-box"
                                            value={searchQuery}
                                            onChange={(e) => this.onChangeSearchQuery(e)}
                                        />
                                    </div>
                                    <div className="dash-board-posts-user-containerbuttomedit">
                                        <FormButtom color="#F5F5F5" to={`/user/publicaciones/add/post/`}>Añadir</FormButtom>
                                    </div>
                                </div>

                                {Array.isArray(posts) && posts.length > 0 ? (
                                    <table className="admin-dashboard-posts-containermainsectiontable">
                                        <thead className="admin-dashboard-posts-containersectionheadertable">
                                            <tr className="admin-dashboard-posts-sectionsheadertable">
                                                {/* Encabezado de la tabla */}
                                                <th className="admin-dashboard-posts-sectionheadertable1">
                                                    <div className="admin-dashboard-posts-textheadertable1">
                                                        <span className="admin-dashboard-posts-text02">
                                                            <div>Usuario</div>
                                                        </span>
                                                    </div>
                                                </th>
                                                <th className="admin-dashboard-posts-sectionheadertable2">
                                                    <div className="admin-dashboard-posts-textheadertable2">
                                                        <span className="admin-dashboard-posts-text04">
                                                            <div>Nombre</div>
                                                        </span>
                                                    </div>
                                                </th>
                                                <th className="admin-dashboard-posts-sectionheadertable3">
                                                    <div className="admin-dashboard-posts-textheadertable3">
                                                        <span className="admin-dashboard-posts-text06">
                                                            <div>Descripcion</div>
                                                        </span>
                                                    </div>
                                                </th>
                                                <th className="admin-dashboard-posts-sectionheadertable5">
                                                    <div className="admin-dashboard-posts-textheadertable5">
                                                        <span className="admin-dashboard-posts-text10">
                                                            <div>Fecha</div>
                                                        </span>
                                                    </div>
                                                </th>
                                                <th className="admin-dashboard-posts-sectionheadertable4">
                                                    <div className="admin-dashboard-posts-textheadertable4">
                                                        <span className="admin-dashboard-posts-text08">
                                                            <div>Estado</div>
                                                        </span>
                                                    </div>
                                                </th>
                                                <th className="admin-dashboard-posts-sectionheadertable6">
                                                    <div className="admin-dashboard-posts-textheadertable6">
                                                        <span className="admin-dashboard-posts-text12">
                                                            <div>Acciones</div>
                                                        </span>
                                                    </div>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="admin-dashboard-posts-containersectionmaintable">
                                            {/* Contenido de la tabla de publicaciones */}
                                            {posts.map(post => (
                                                <tr key={post.id} className="admin-dashboard-posts-sectiontabletr">
                                                    <td className="admin-dashboard-posts-sectiontabletd">
                                                        <div className="admin-dashboard-posts-td">
                                                            <span className="admin-dashboard-posts-text14">
                                                                <span>{post.userName}</span>
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td className="admin-dashboard-posts-sectiontabletd1">
                                                        <div className="admin-dashboard-posts-td1">
                                                            <span className="admin-dashboard-posts-text16">
                                                                <span>{post.postName}</span>
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td className="admin-dashboard-posts-sectiontabletd2">
                                                        <div className="admin-dashboard-posts-td2">
                                                            <span className="admin-dashboard-posts-text18">
                                                                <span>{post.description}</span>
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td className="admin-dashboard-posts-sectiontabletd4">
                                                        <div className="admin-dashboard-posts-td4">
                                                            <span className="admin-dashboard-posts-text22">
                                                                <span>{this.formatDate(post.creationDate)}</span>
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td className="admin-dashboard-posts-sectiontabletd3">
                                                        <div className="admin-dashboard-posts-td3">
                                                            <span className="admin-dashboard-posts-text20">
                                                                <span>{post.postStatus}</span>
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td className="admin-dashboard-posts-sectiontabletd5">
                                                        <FormButtom color="#F5F5F5" to={`/user/publicaciones/edit/${post.id}`}>Editar</FormButtom>
                                                    </td>
                                                    <td className="admin-dashboard-posts-sectiontabletd6">
                                                        <FormButtom color="#F5F5F5" onClick={() => this.handleDeletePost(post.id)}>Eliminar</FormButtom>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                        <tfoot className="admin-dashboard-posts-containersectionmainpagination">
                                            <tr>
                                                <td className="admin-dashboard-posts-containerpageiconleft">
                                                    {currentPage >= 1 && (
                                                        <button className="admin-dashboard-posts-containericonleft" onClick={() => this.handlePageChange(currentPage - 1)} disabled={currentPage === 0}>
                                                            <Icon name="Arrow1" size='26px' />
                                                        </button>
                                                    )}
                                                </td>
                                                {Array.from(Array(totalPages).keys()).slice(currentPage, currentPage + 4).map(pageNumber => (
                                                    <td key={pageNumber} className={`admin-dashboard-posts-containerpagenum1 ${pageNumber === currentPage ? 'active-page' : ''}`}>
                                                        <span className={'admin-dashboard-posts-text2'}>{pageNumber + 1}</span>
                                                    </td>
                                                ))}
                                                <td className="admin-dashboard-posts-containerpageiconright">
                                                    {currentPage < totalPages - 1 && (
                                                        <button className="admin-dashboard-posts-containericonleft" onClick={() => this.handlePageChange(currentPage + 1)} disabled={currentPage === totalPages - 1}>
                                                            <Icon name="Arrow2" size='26px' />
                                                        </button>
                                                    )}
                                                </td>
                                            </tr>
                                        </tfoot>
                                    </table>
                                ) : (
                                    <div className="admin-dashboard-posts-containersectionmaintable">
                                        <p>No hay existen publicaciones disponibles</p>
                                    </div>
                                )}
                                <ModalDelete
                                    show={showDeleteModal}
                                    onHide={() => this.setState({ showDeleteModal: false })}
                                    onConfirm={this.confirmDeletePost}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}
