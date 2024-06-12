import React, { Component } from "react";
import './viewCatalogUser.css';
import authService from "../../../services/auth/auth.service";
import Header from "../../../components/common/layout/header/header";
import Icon from "../../../components/UI/icon/icon";
import RentalButton from "../../../components/UI/Button/RentalButton/rentalButton";
import PostService from "../../../services/post/post.service";
import BicycleService from "../../../services/bicycle/bicycle.service";
import Footer from "../../../components/common/layout/footer/footer";
import FilterButton from "../../../components/UI/Button/CategoryButton/filterButton";

export default class ViewCatalogUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentUser: undefined,
            posts: [],
            tags: [],
            categories: [],
            selectedCategory: '',
            searchQuery: '',
            currentPage: 0,
            totalPages: 0,
            price: 0,
            fromDate: null,
            toDate: new Date(),
            selectedDateFilter: '',
        };
    }

    componentDidMount() {
        const user = authService.getCurrentUser();
        if (user && user.roles.includes('ROLE_USER')) {
            this.setState({
                currentUser: user,
            }, () => {
                this.retrievesPosts();
                this.getAllTags();
                this.getAllCategories();
            });
        }
    }

    onChangeSearchQuery = (e) => {
        const searchQuery = e.target.value;
        this.setState({
            searchQuery: searchQuery,
            currentPage: 0
        }, () => {
            this.retrievesPosts();
        });
    }

    onTagSelect = (tag) => {
        this.setState({
            selectedTag: tag,
            currentPage: 0
        }, () => {
            this.retrievesPosts();
        });
    }

    onCategorySelect = (categoryName) => {
        this.setState({
            selectedCategory: categoryName,
            currentPage: 0
        }, () => {
            this.retrievesPosts();
        });
    }

    resetFilters = () => {
        this.setState({
            searchQuery: '',
            selectedTag: '',
            selectedCategory: '',
            price: 0,
            currentPage: 0,
            fromDate: null,
            toDate: new Date(),
            selectedDateFilter: ''
        }, () => {
            this.retrievesPosts();
        });
    }


    handleFilterByDate = (selectedOption) => {
        let fromDate;
        const toDate = new Date();

        switch (selectedOption) {
            case 'last24Hours':
                fromDate = new Date(toDate);
                fromDate.setDate(fromDate.getDate() - 1);
                break;
            case 'lastWeek':
                fromDate = new Date(toDate);
                fromDate.setDate(fromDate.getDate() - 7);
                break;
            case 'lastMonth':
                fromDate = new Date(toDate);
                fromDate.setMonth(fromDate.getMonth() - 1);
                break;
            default:
                fromDate = null;
        }

        // Convertir las fechas al formato ISO (yyyy-MM-dd)
        const fromDateISO = fromDate ? fromDate.toISOString().split('T')[0] : null;
        const toDateISO = toDate.toISOString().split('T')[0];

        this.setState({
            fromDate: fromDateISO,
            toDate: toDateISO,
            currentPage: 0,
            selectedDateFilter: selectedOption // Añadir esto para guardar el filtro de fecha seleccionado
        }, () => {
            this.getAllPostsByDateRange();
        });
    }



    retrievesPosts() {
        const { searchQuery, currentPage, currentUser, selectedTag } = this.state;
        const pageSize = 6;
        if (currentUser) {
            PostService.getAllPosts(searchQuery, currentPage, pageSize, selectedTag)
                .then(data => {
                    if (data && data.content) {
                        this.setState({
                            posts: data.content,
                            totalPages: data.totalPages
                        });
                        if (data.content.length > 0) {
                            data.content.forEach(post => {
                                this.getBicycleByPostId(post.id);
                            });
                        }
                    }
                })
                .catch(error => {
                    console.error('Error fetching posts:', error);
                });
        }
    }

    getBicycleByPostId(postId) {
        BicycleService.getBicycleByPostId(postId)
            .then(response => {
                this.setState(prevState => ({
                    posts: prevState.posts.map(post => {
                        if (post.id === postId) {
                            return {
                                ...post,
                                imageUrl: response.bicycleImage
                            };
                        }
                        return post;
                    })
                }));
            })
            .catch(e => {
                console.log(e);
            });
    }

    getAllCategories = () => {
        PostService.getAllCategories()
            .then(response => {
                this.setState({ categories: response });
            })
            .catch(error => {
                console.error("Error fetching categories:", error);
            });
    }

    getAllTags() {
        PostService.getAllTags()
            .then(response => {
                this.setState({
                    tags: response,
                });
            })
            .catch(error => {
                console.error("Error fetching tags:", error);
            });
    }

    handlePriceChange = (e) => {
        const price = parseFloat(e.target.value);
        this.setState({
            price: price,
            currentPage: 0
        }, () => {
            this.getAllPostsByPrice();
        });
    }

    getAllPostsByPrice() {
        const { price, currentPage } = this.state;
        const pageSize = 6;

        PostService.filterPostsByPrice(price, currentPage, pageSize)
            .then(data => {
                this.setState({
                    posts: data.content,
                    totalPages: data.totalPages
                });
                data.content.forEach(post => {
                    this.getBicycleByPostId(post.id);
                });
            })
            .catch(error => {
                console.error('Error fetching posts by price:', error);
            });
    }

    getAllPostsByTagName(tagName) {
        PostService.getAllPostsByTagName(tagName, this.state.currentPage, 6)
            .then(data => {
                this.setState({
                    posts: data.content,
                    totalPages: data.totalPages
                });
                data.content.forEach(post => {
                    this.getBicycleByPostId(post.id);
                });
            })
            .catch(error => {
                console.error('Error fetching posts by tag:', error);
            });
    }

    getAllPostsByCategoryId(categoryId) {
        PostService.getAllPostsByCategoryId(categoryId, this.state.currentPage, 6)
            .then(data => {
                this.setState({
                    posts: data.content,
                    totalPages: data.totalPages
                });
                data.content.forEach(post => {
                    this.getBicycleByPostId(post.id);
                });
            })
            .catch(error => {
                console.error('Error fetching posts by category:', error);
            });
    }

    loadMorePosts = () => {
        const { currentPage, posts } = this.state;
        const nextPage = currentPage + 1;
        const pageSize = 6;

        PostService.getAllPosts(this.state.searchQuery, nextPage, pageSize, this.state.selectedTag)
            .then(data => {
                const updatedPosts = [...posts, ...data.content];
                this.setState({
                    posts: updatedPosts,
                    currentPage: nextPage,
                    totalPages: data.totalPages
                });
                data.content.forEach(post => {
                    this.getBicycleByPostId(post.id);
                });
            })
            .catch(error => {
                console.error('Error fetching posts:', error);
            });
    }

    getAllPostsByDateRange() {
        const { fromDate, toDate, currentPage } = this.state;
        const pageSize = 6;

        PostService.filterPostsByDateRange(fromDate, toDate, currentPage, pageSize)
            .then(data => {
                this.setState({
                    posts: data.content,
                    totalPages: data.totalPages
                });
                data.content.forEach(post => {
                    this.getBicycleByPostId(post.id);
                });
            })
            .catch(error => {
                console.error('Error fetching posts by date range:', error);
            });
    }


    render() {
        const { currentUser, searchQuery, posts, tags, selectedTag, categories, selectedDateFilter } = this.state;


        return (

            <div className="view-catalog-user-container">
                <div className="view-catalog-user-view-catalog-user">
                    <Header currentUser={currentUser} />
                    <div className="view-catalog-user-containerdashboardadmin">
                        <div className="view-catalog-user-containerdashboardsections">


                            <div className="view-catalog-user-containercatalogsectionsidebar">
                                <div className="view-catalog-user-containerdashboardcatalogfiltercategory">
                                    <div className="view-catalog-user-containercatalogsectioncategorymain">
                                        <div className="view-catalog-user-containercatalogcategorytitle">
                                            <div className="view-catalog-user-containercategorytitle">
                                                <div className="view-catalog-user-containertitle">
                                                    <span className="view-catalog-user-text">
                                                        <span>Filtrar por Categorías</span>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="view-catalog-user-containercatalogcategories">

                                            <div className="view-catalog-user-containercatalogcategories">

                                                {categories.map((category, index) => (
                                                    <button
                                                        key={index}
                                                        className={`view-catalog-user-containerpanelmenusection ${this.state.selectedCategory === category.categoryName ? 'selected' : ''}`}
                                                        onClick={() => this.onCategorySelect(category.categoryName)}
                                                    >
                                                        <div className="view-catalog-user-containermenusectiontext">
                                                            <span className={`view-catalog-user-text002 ${this.state.selectedCategory === category.categoryName ? 'selected' : ''}`}>
                                                                <span>{category.categoryName}</span>
                                                            </span>
                                                        </div>
                                                    </button>
                                                ))}

                                            </div>
                                        </div>
                                    </div>

                                </div>

                                <div className="view-catalog-user-containerdashboardcatalogfilterdate">
                                    <div className="view-catalog-user-containerfiltercheckboxsectiontitle">
                                        <span className="view-catalog-user-text020">
                                            <span>Fecha de Publicación</span>
                                        </span>
                                    </div>
                                    <div className="view-catalog-user-containerfiltercheckboxsectionbuttoms">
                                        <div className="view-catalog-user-containerfiltercheckbox">
                                            <div className="view-catalog-user-containerfiltercheckboxbuttom">
                                                <input
                                                    className="custom-checkbox"
                                                    type="checkbox"
                                                    checked={selectedDateFilter === 'last24Hours'}
                                                    onChange={() => this.handleFilterByDate('last24Hours')}
                                                />
                                            </div>
                                            <div className="view-catalog-user-containerfiltercheckboxlabel">
                                                <div className="view-catalog-user-containerfiltercheckboxtext">
                                                    <span className="view-catalog-user-text022">
                                                        <label>Ultimas 24 horas</label>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="view-catalog-user-containerfiltercheckbox1">
                                            <div className="view-catalog-user-containerfiltercheckboxbuttom1">
                                                <input
                                                    className="custom-checkbox"
                                                    type="checkbox"
                                                    checked={selectedDateFilter === 'lastWeek'}
                                                    onChange={() => this.handleFilterByDate('lastWeek')}
                                                />
                                            </div>
                                            <div className="view-catalog-user-containerfiltercheckboxlabel1">
                                                <div className="view-catalog-user-containerfiltercheckboxtext1">
                                                    <span className="view-catalog-user-text024">
                                                        <label>Ultima Semana</label>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="view-catalog-user-containerfiltercheckbox2">
                                            <div className="view-catalog-user-containerfiltercheckboxbuttom2">
                                                <input
                                                    className="custom-checkbox"
                                                    type="checkbox"
                                                    checked={selectedDateFilter === 'lastMonth'}
                                                    onChange={() => this.handleFilterByDate('lastMonth')}
                                                />
                                            </div>
                                            <div className="view-catalog-user-containerfiltercheckboxlabel2">
                                                <div className="view-catalog-user-containerfiltercheckboxtext2">
                                                    <span className="view-catalog-user-text026">
                                                        <label>Ultima Mes</label>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="view-catalog-user-containerdashboardcatalogfilterprice">
                                    <div className="view-catalog-user-containerfilterprocesssectionprocess">
                                        <div className="form-group">

                                            <div className="view-catalog-user-containerfilterprocesssectiontitle">
                                                <span className="view-catalog-user-text028">
                                                    <label htmlFor="priceRange">Precio</label>
                                                </span>
                                            </div>
                                            <input
                                                type="range"
                                                className="form-range"
                                                id="priceRange"
                                                min="0"
                                                max="100"
                                                step="1"
                                                defaultValue="0"
                                                onChange={this.handlePriceChange}
                                            />
                                            <small className="form-text text-muted">
                                                Precio: {this.state.price} €
                                            </small>
                                        </div>
                                    </div>
                                </div>

                                <div className="view-catalog-user-containerdashboardcatalogfilterbuttom">

                                    <FilterButton textColor="#FFFFFF" color="#121417" onClick={this.resetFilters}>Limpiar filtros</FilterButton>

                                </div>
                            </div>


                            <div className="view-catalog-user-containercatalogsectionmain">
                                <div className="view-catalog-user-containercatalogsectiontitle">
                                    <div className="view-catalog-user-containercatalogtitle">
                                        <span className="view-catalog-user-text036">
                                            <span>Publicaciones</span>
                                        </span>
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
                                    </div>
                                    <div className="view-catalog-user-containercatalogsubtitle">
                                        <span className="view-catalog-user-text038">
                                            <span>
                                                Encuentra la compañera perfecta para tu próxima aventura
                                                sobre ruedas
                                            </span>
                                        </span>
                                    </div>
                                </div>

                                <div className="view-catalog-user-containercatalogsectiontags">
                                    <div className="view-catalog-user-containersectiontag">
                                        <button className="view-catalog-user-containertagtext" onClick={() => this.onTagSelect('')}>
                                            <span className={`view-catalog-user-text040 ${selectedTag === '' ? 'selected' : ''}`}>
                                                <span>Todas</span>
                                            </span>
                                        </button>
                                    </div>
                                    {tags.slice(0, 4).map((tag, index) => (
                                        <div key={index} className="dash-board-edit-post-admin-containersectiontag1">
                                            <button className="dash-board-edit-post-admin-containertagname" onClick={() => this.getAllPostsByTagName(tag.tagName)}>
                                                <div className={`dash-board-edit-post-admin-tagname ${selectedTag === tag.tagName ? 'selected' : ''}`}>
                                                    <span className="dash-board-edit-post-admin-text11">
                                                        <span>{tag.tagName}</span>
                                                    </span>
                                                </div>
                                            </button>
                                        </div>
                                    ))}
                                </div>

                                <div className="view-catalog-user-containercatalogsectioncards">
                                    <div className="view-catalog-user-containercatalogcards">
                                        {Array.isArray(posts) && posts.length > 0 ? (
                                            posts.map((post, index) => (
                                                <div key={index} className="view-catalog-user-containercatalogcard">
                                                    <img src={post.imageUrl} className="view-catalog-user-containercatalogcardimg" alt={"publicacion" + post.id}></img>
                                                    <div className="view-catalog-user-containercatalogcardbody">
                                                        <div className="view-catalog-user-containercatalogcardtext">
                                                            <div className="view-catalog-user-containercardtexttitle">
                                                                <span className="view-catalog-user-text050">
                                                                    <span>{post.postName}</span>
                                                                </span>
                                                            </div>
                                                            <div className="view-catalog-user-containercardtextsubtitle">
                                                                <span className="view-catalog-user-text052">
                                                                    <span>{post.description}</span>
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className="view-catalog-user-containercatalogcardbuttom">
                                                            <RentalButton to={`/publicaciones/reserva/${post.id}`}>Alquilar</RentalButton>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="view-catalog-user-no-posts">No hay publicaciones disponibles</div>
                                        )}




                                        <div className="view-catalog-user-containercatalogsectionbuttom">
                                            <div className="view-catalog-user-containerbuttomcatalogshowmore">
                                                <div className="view-catalog-user-containerbuttomshowmore">
                                                    <div className="view-catalog-user-containerbuttomtextshowmore">
                                                        <button className="view-catalog-user-buttomshowmore" onClick={this.loadMorePosts}>
                                                            <span className="view-catalog-user-text086">
                                                                <span>Ver Más</span>
                                                            </span>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Footer />
                </div>
            </div>



        );
    }

}
