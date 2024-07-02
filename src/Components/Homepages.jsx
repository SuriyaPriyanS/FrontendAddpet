import React from 'react';
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from 'react-icons/fa';

const Homepages = () => {
  return (
    <div className="relative">
      <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src="https://media.istockphoto.com/id/1885088156/photo/happy-dog-looking-up-at-camera-with-smile.jpg?s=1024x1024&w=is&k=20&c=B7-5xHHDgmaCkNjs4XCtM9dkhVjWowmPXsXVTAOeEhE="
              className="block w-full"
              alt="Happy Dog"
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://media.istockphoto.com/id/1497909628/photo/cat-and-dog-sitting-together-on-meadow.jpg?s=1024x1024&w=is&k=20&c=bs5z-9EWFQ2BIo2Rw1DGsGu3c6JBkq9vje-S5DSBTe0="
              className="block w-full"
              alt="Cat and Dog Sitting Together"
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://images.unsplash.com/photo-1444212477490-ca407925329e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHBldHN8ZW58MHx8MHx8fDA%3D"
              className="block w-full"
              alt="Featured Pets"
            />
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
          <FaArrowAltCircleLeft className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="sr-only">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
          <FaArrowAltCircleRight className="carousel-control-next-icon" aria-hidden="true" />
          <span className="sr-only">Next</span>
        </button>
        <div className="absolute bottom-0 left-0 p-3 text-white">
          {/* Additional content can go here */}
        </div>
        <div className="absolute bottom-0 right-0 p-3 text-white">
          {/* Additional content can go here */}
        </div>
      </div>

      {/* Additional content below carousel */}
      <div className="mt-5">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-6">
              <img
                src="https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8ZG9nJTIwdGhhbmslMjB5b3V8ZW58MHx8MHx8fDA%3D"
                alt="Right Image 2"
                className="w-full h-auto rounded mb-3"
              />
              <h3 className="text-2xl font-semibold mb-2">Right Image 2</h3>
              <p className="text-right mb-2">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla convallis libero ac velit molestie, ac
                condimentum sapien faucibus. In hac habitasse platea dictumst. Nullam nec est non lorem vestibulum
                consectetur ut non urna.
              </p>
              <p>
                Suspendisse potenti. Donec sodales sapien sed mauris tempor, et interdum velit rhoncus. Nullam dignissim
                malesuada odio, vel tristique neque gravida at. Ut sollicitudin, mauris ut consectetur egestas, lectus metus
                consequat lorem, quis consectetur odio metus nec quam.
              </p>
            </div>
            <div className="w-full md:w-1/2 px-4 mb-6">
              <img
                src="https://media.istockphoto.com/id/518172554/photo/western-victorian-crowned-pigeon.jpg?s=1024x1024&w=is&k=20&c=XALMVFqNDf59J_jWH3NXmwBGUp5sWSlTVE5Ncv1dDD8="
                alt="Right Image 2"
                className="w-full h-auto rounded mb-3"
              />
              <h3 className="text-2xl font-semibold mb-2">Right Image 2</h3>
              <p className="mb-2">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla convallis libero ac velit molestie, ac
                condimentum sapien faucibus. In hac habitasse platea dictumst. Nullam nec est non lorem vestibulum
                consectetur ut non urna.
              </p>
              <p>
                Suspendisse potenti. Donec sodales sapien sed mauris tempor, et interdum velit rhoncus. Nullam dignissim
                malesuada odio, vel tristique neque gravida at. Ut sollicitudin, mauris ut consectetur egestas, lectus metus
                consequat lorem, quis consectetur odio metus nec quam.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepages;
