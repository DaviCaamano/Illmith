import MailIcon from '@icons/mail-prompt.svg';
import { BaseAlertTemplate } from '@components/modal/alert/templates/BaseAlertTemplate';

export const EmailNotificationAlert = ({ message, subMessage }: { message: string; subMessage?: string }) => (
  <BaseAlertTemplate message={message} subMessage={subMessage}>
    <MailIcon />
  </BaseAlertTemplate>
);
