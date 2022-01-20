import { expect } from "chai";
import chai from "chai";
import chaiHttp from "chai-http";
import app from "../src/api";
import nock from "nock";
chai.use(chaiHttp);

const url = "https://api.github.com/";
describe("Search github user by programming language", () => {
	describe("functional tests - users", async () => {
		before(() => {
			nock(`${url}`)
				.get("/search/users?sort=created&order=asc&q=language:erlang")
				.times(3)
				.reply(200, {
					incomplete_results: false,
					total_count: 2,
					items: [
						{
							login: "mojombo",
							id: 1,
							avatar_url: "https://dummy.png",
						},
						{
							login: "mojombo2",
							id: 1,
							avatar_url: "https://dummy2.png",
						},
					],
				});
			nock(`${url}`).get("/users/mojombo").times(3).reply(200, {
				login: "mojombo",
				avatar_url: "https://github.com/dummy.gif",
				name: "monalisa mojombo",
				followers: 20,
			});

			nock(`${url}`).get("/users/mojombo2").times(3).reply(200, {
				login: "mojombo2",
				avatar_url: "https://github.com/dummy.gif",
				name: "monalisa mojombo2",
				followers: 10,
			});
		});

		it("should get max users", async () => {
			const res = await chai.request(app).get("/users/erlang");
			expect(res).to.have.status(200);
		});

		it("should get one user", async () => {
			const res = await chai.request(app).get("/users/erlang?limit=1");
			expect(res).to.have.status(200);
		});

		it("should get two users", async () => {
			const res = await chai.request(app).get("/users/erlang?limit=5");
			expect(res).to.have.status(200);
		});

		it("should be invalid request ", async () => {
			const res = await chai.request(app).get("/wrong-url");
			expect(res).to.have.status(404);
		});
	});
});
