import { useContext } from 'react';
import AuthContext from '../../context/AuthProvider';
import { useUserPhoto } from './useUserPhoto';
import Avatar from '../../ui/Avatar';
import SpinnerMini from '../../ui/SpinnerMini';

/* const StyledUserAvatar = styled.div`
  display: flex;
  gap: 1.2rem;
  align-items: center;
  font-weight: 500;
  font-size: 1.4rem;
  color: var(--color-grey-600);
`;
 */
/* const Avatar = styled.img`
  display: block;
  width: 4rem;
  width: 3.6rem;
  aspect-ratio: 1;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
  outline: 2px solid var(--color-grey-100);
`; */

function UserAvatar({ extra = {} }) {
  const { auth } = useContext(AuthContext);
  const username = auth?.username;
  const { photo, isLoading, error } = useUserPhoto();

  if (isLoading) {
    return <SpinnerMini />;
  }

  return (
    <>
      {error ? (
        <Avatar
          extra={extra}
          src={'default-user.jpg'}
          alt={`Photo of ${username}`}
        />
      ) : (
        <Avatar
          src={`data:image/jpeg;base64,${photo}`}
          alt={`Photo of ${username}`}
          extra={extra}
        />
      )}
    </>
  );
}

export default UserAvatar;
