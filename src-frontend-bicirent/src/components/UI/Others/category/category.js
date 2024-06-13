import React, { Component } from 'react';
import './category.css';
import PostService from '../../../../services/post/post.service';
import BicycleService from '../../../../services/bicycle/bicycle.service';
import { Link } from 'react-router-dom';

export default class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      loading: true // Agregar un estado para indicar carga
    };
  }

  componentDidMount() {
    this.retrievesPosts();
  }

  componentDidUpdate(prevProps) {
    // Verificar si las propiedades han cambiado (por ejemplo, si volvemos a esta página)
    if (prevProps !== this.props) {
      this.retrievesPosts();
    }
  }

  retrievesPosts() {
    PostService.getLatestPosts()
      .then(data => {
        // Actualizar el estado con los datos de las publicaciones
        this.setState({
          posts: data,
          loading: false // Indicar que la carga ha finalizado
        });

        // Para cada publicación, obtener la bicicleta asociada
        data.forEach(post => {
          this.getBicycleByPostId(post.id);
        });
      })
      .catch(error => {
        console.error('Error fetching posts:', error);
        this.setState({ loading: false }); // Manejar error y finalizar carga
      });
  }

  getBicycleByPostId(postId) {
    BicycleService.getBicycleByPostId(postId)
      .then(response => {
        // Actualizar la publicación correspondiente con la bicicleta recuperada
        this.setState(prevState => ({
          posts: prevState.posts.map(post => {
            if (post.id === postId) {
              return {
                ...post,
                imageUrl: response.bicycleImage,
                rentalPrice: response.rentalPrice
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

  render() {
    const { posts, loading } = this.state;

    return (
      <div className="category-container">
        <div className="category-containersectioncategories">
          <div className="category-containercategoriestitle">
            <div className="category-containercategoriestitleh1">
              <span className="category-text">
                <span>Publicaciones destacadas</span>
              </span>
            </div>
            <div className="category-containercategoriessubtitle">
              <span className="category-text02">
                <span>Las publicaciones mejor valoradas</span>
              </span>
            </div>
          </div>
          <div className="category-containercategorieslist">
            {loading ? (
              <p>Cargando...</p> // Indicador de carga mientras se obtienen los datos
            ) : (
              posts.slice(0, 4).map((post, index) => (
                <div key={index} className="category-depth5-frame0">
                  <div className="category-depth6-frame0">
                    <Link to={`/publicaciones/reserva/${post.id}`}>
                      <img src={post.imageUrl} className="category-depth7-frame0" alt="post" />
                    </Link>
                  </div>
                  <div className="category-depth6-frame1">
                    <div className="category-depth7-frame01">
                      <span className="category-text04">
                        <span>{post.postName}</span>
                      </span>
                    </div>
                    <div className="category-depth7-frame1">
                      <span className="category-text06">
                        <span>{post.rentalPrice} € / hora</span>
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    );
  }
}
