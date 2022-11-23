import { AppDataSource } from "./data-source";
import { Post } from "./entity/Post";
import { User } from "./entity/User";

AppDataSource.initialize()
  .then(async () => {
    console.log("Inserting a new user into the database...");
    const john = new User();
    john.firstName = "John";
    john.lastName = "Doe";
    await AppDataSource.manager.save(john);
    const timber = new User();
    timber.firstName = "Timber";
    timber.lastName = "Saw";
    await AppDataSource.manager.save(timber);
    const post1 = new Post();
    post1.author = john;
    post1.name = "First";
    await AppDataSource.manager.save(post1);
    const post2 = new Post();
    post2.author = timber;
    post2.name = "Second";
    await AppDataSource.manager.save(post2);

    const res = await AppDataSource.manager.find(Post, {
      where: [
        { author: { firstName: "Timber" } },
        { author: { lastName: "Doe" } },
      ],
    });
    console.log("found:", res);
  })
  .catch((error) => console.log(error));
