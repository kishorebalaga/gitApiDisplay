import { useEffect, useState } from "react";
import { Form, Card, Icon, Image } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import "./App.css";

export default function Search() {
  let [userName, setuserName] = useState("");
  let [name, setName] = useState("");
  let [login, setLogin] = useState("");
  let [followers, setFollowers] = useState("");
  let [following, setFollowing] = useState("");
  let [public_repos, setPublic_repos] = useState("");
  let [avatar_url, setAvatar_url] = useState("");
  let [receiveData, setReceiveData] = useState(false);

  const setData = ({
    name,
    login,
    followers,
    following,
    public_repos,
    avatar_url,
  }) => {
    setuserName(name);
    setFollowers(followers);
    setFollowing(following);
    setLogin(login);
    setPublic_repos(public_repos);
    setAvatar_url(avatar_url);
    setReceiveData(true);

    console.log(name, following);
  };
  const submitUserName = (event) => {
    fetch(`https://api.github.com/users/${name}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        console.log(data);
      })
      .catch((error) => {
        setReceiveData(false);
      });
    event.preventDefault();
  };
  const onChangeInput = (event) => {
    // console.log(event.target.value);
    setName(event.target.value);
  };
  return (
    <div>
      <h2> Please enter the username of git</h2>

      <div className="search">
        <form onSubmit={submitUserName}>
          <input onChange={onChangeInput} />
          <button type="submit">Submit</button>
        </form>{" "}
      </div>
      {receiveData ? (
        <div className="card">
          <Card>
            <img src={avatar_url} />
            <Card.Content>
              <Card.Header>{userName}</Card.Header>
              <Card.Meta>
                <span>Public Repositories :{public_repos}</span>
              </Card.Meta>
              <Card.Description>
                <Icon name="user" />
                Followers:{followers}
              </Card.Description>
              <Card.Description>
                <Icon name="user" className="Icon_new" />
                Following:{following}
              </Card.Description>
            </Card.Content>
          </Card>
        </div>
      ) : (
        <div className="card">
          <Card>
            <img src="https://react.semantic-ui.com/images/avatar/large/matthew.png" />
            <Card.Content>
              <Card.Header>Matthew</Card.Header>
              <Card.Meta>
                <span className="date">Joined in 2015</span>
              </Card.Meta>
              <Card.Description>
                Matthew is a musician living in Nashville.
              </Card.Description>
            </Card.Content>
          </Card>
        </div>
      )}
    </div>
  );
}
