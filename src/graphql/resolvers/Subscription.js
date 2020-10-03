const { getPostById } = require('../../db/queries/post');

const Subscription = {
  count: {
    subscribe(parent, args, { pubsub }) {
      let count = 0;

      setInterval(() => {
        count += 1;
        pubsub.publish('count', {
          count,
        });
      }, 1000);

      return pubsub.asyncIterator('count');
    },
  },
  comment: {
    subscribe: async (parent, { postId }, { pubsub }) => {
      const post = await getPostById(postId);
      if (!post) {
        return new Error('Post not found');
      }
      return pubsub.asyncIterator(`comment_${postId}`);
    },
  },
  post: {
    subscribe: async (parent, args, { pubsub }) => {
      return pubsub.asyncIterator(`post`);
    },
  },
};

module.exports = { Subscription };
