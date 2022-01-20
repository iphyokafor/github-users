import github from "octonode";
import User from "../entity/user";
import config from "config";
const client = github.client(config.get("oauth.token"));

const octo = {
  /**
   * @param {String} lang
   * @param {Integer} limit
   * @return {Promise}
   */
  searchUsers(lang, limit) {
    return new Promise((resolve, reject) => {
      client.search().users(
        {
          q: `language:${lang}`,
          sort: "created",
          order: "asc",
        },
        function (err, data) {
          if (err) {
            reject(err);
          }
          if (data && data.items) {
            let items = data.items.slice(0, limit);
            let users = [];
            items.forEach(function (entry) {
              users.push(new User(entry.login, null, entry.avatar_url, null));
            });
            resolve(users);
          }
        }
      );
    });
  },

  /**
   * @param {Object[]} users
   * @return {Promise}
   */
  lookupUsers(users) {
    return new Promise((resolve, reject) => {
      let promises = users.map((user) => {
        return new Promise((res, rej) => {
          client.user(user.username).info(function (err, data) {
            if (err || "undefined" === typeof data) {
              rej(err);
            } else {
              user.name = data.name;
              user.followers = data.followers;
              res(user);
            }
          });
        });
      });

      Promise.all(promises)
        .then((users) => {
          resolve(users);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  /**
   * @param {String} lang
   * @param {Integer} limit
   * @return {Promise}
   */

  async searchByLang(lang: string, limit: any) {
    try {
      let max = limit || config.get("limit");
      const users = await octo.searchUsers(lang, max);

      const usersData = await octo.lookupUsers(users);

      return usersData;
    } catch (error) {
      console.log(error);
      return error.message;
    }
  },

  //   searchByLang(lang: string, limit: any): Promise<any> {
  //     let max = limit || config.get("limit");
  //     return new Promise((resolve, reject) => {
  //       octo
  //         .searchUsers(lang, max)
  //         .then(octo.lookupUsers)
  //         .then((users) => {
  //           resolve(users);
  //         })
  //         .catch((err) => {
  //           reject(err);
  //         });
  //     });
  //   },
};

export default octo;
