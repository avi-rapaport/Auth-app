interface User {
  id: number;
  username: string;
  email: string;
}

const UserDetails = ({ id, username, email }: User) => {
  return (
    <div className="details">
      <h1>ID: {id}</h1>
      <h1>Username: {username}</h1>
      <h1>Email: {email}</h1>
    </div>
  );
};

export default UserDetails;
