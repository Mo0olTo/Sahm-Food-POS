export const ORDER_STATUS_CONFIG = {
    received: {
      label: 'Received',
      className: 'bg-yellow-500/15 text-yellow-400',
    },
    preparing: {
      label: 'Preparing',
      className: 'bg-blue-500/15 text-blue-400',
    },
    ready: {
      label: 'Ready',
      className: 'bg-green-500/15 text-green-400',
    },
    delivered: {
      label: 'Delivered',
      className: 'bg-purple-500/15 text-purple-400',
    },
    completed: {
      label: 'Completed',
      className: 'bg-gray-500/15 text-gray-300',
    },
  } as const;