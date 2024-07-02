// AdaptationCard.jsx

import React from 'react';

const AdaptationCard = ({ adaptationPosts }) => {
  return (
    <div className="adaptation-card">
      {adaptationPosts.map((post) => (
        <div key={post._id} className="card">
          <div className="card-body">
            <h5 className="card-title">{post.title}</h5>
            <p className="card-text">{post.description}</p>
            {/* Add more details as needed */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdaptationCard;
