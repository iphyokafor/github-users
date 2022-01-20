/**
 * User
 */
export default class User {
	username: string;
	name: string;
	avatarUrl: string;
	followers: number;

	/**
	 * @param {String} username
	 * @param {String} name
	 * @param {String} avatarUrl
	 * @param {Integer} followers
	 */
	constructor(
		username: string,
		name: string,
		avatarUrl: string,
		followers: number
	) {
		this.username = username;
		this.name = name;
		this.avatarUrl = avatarUrl;
		this.followers = followers;
	}
}
