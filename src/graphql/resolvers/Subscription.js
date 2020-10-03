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
};

module.exports = { Subscription };
