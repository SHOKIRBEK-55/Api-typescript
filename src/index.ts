import "./main.css";

const searchForm:HTMLFormElement = document.querySelector('.search_form')!;
const searchInput:HTMLInputElement = document.querySelector('.search_input')!;
const info: HTMLDivElement = document.querySelector('.info')!;
let  url = 'https://api.github.com/users/';

searchForm.addEventListener('submit', function (e) {
  e.preventDefault();
  userData(searchInput.value);
});

function userData(username: string): void {
  fetch(url + username)
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        info.innerHTML = 'salom:)';
      }
    })
    .then((data) => {
      console.log(data);
      let output = `
            <div class="image">
                <img src="${data.avatar_url}" alt="">
            </div>
            <div class="user_data">
                <h2>${data.name}</h2>
                <p>${data.bio}</p>
                <ul>
                    <li>${data.followers} <strong>Followers</strong></li>
                    <li>${data.following} <strong>Following</strong></li>
                    <li>${data.public_repos} <strong> Repositories</strong></li>
                </ul>
                <div class="repo">
                </div>
            </div>
        `;
      document.querySelector('.wrapper')!.innerHTML = `<div class="info"></div>`;
      const info = document.querySelector('.info') as HTMLDivElement;
      info.innerHTML = output;
      let imageWidth = document.querySelector('.image')!.clientWidth;
      let image = document.querySelector('.image') as HTMLDivElement;
      image.style.cssText = `height: ${imageWidth}px`;
      searchInput.value = '';

      userRepo(username);
    })
    .catch((error) => {
      info.innerHTML = 'Something went Wrong :) <br> Error: ' + error;
   });
  }
  
function userRepo(username: string): void {
  fetch(url + username + '/repos')
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        info.innerHTML = 'Something went Wrong :) <br> Maybe you have given a wrong username!';
      }
    })
    .then((data) => {
      console.log(data);
      let repo = '';
      for (let i = 0; i < data.length; i++) {
        repo += `<a href="${data[i].html_url}">${data[i].name}</a>`;
      }
      document.querySelector('.repo')!.innerHTML = repo;
    })
    .catch((error) => {
      info.innerHTML = 'Something went Wrong :) <br> Error: ' + error;
    });
}




