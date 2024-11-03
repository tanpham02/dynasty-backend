import { Notifications } from '@app/types';
import { model, Schema } from 'mongoose';

const notificationSchema = new Schema<Notifications>(
  {
    reference: {
      orderId: {
        type: Schema.Types.ObjectId,
        ref: 'Order',
      },
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const NotificationsModel = model('Notification', notificationSchema);

export default NotificationsModel;
