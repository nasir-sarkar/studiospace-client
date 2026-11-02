import { auth } from "../src/lib/auth";

const examiner = {
  name: "Examiner Host",
  email: "examiner@studiospace.dev",
  password: "Examiner@123",
  image: "https://api.dicebear.com/9.x/initials/svg?seed=Examiner%20Host",
};

const run = async () => {
  try {
    await auth.api.signUpEmail({ body: examiner });
    console.log(`Examiner account created: ${examiner.email}`);
  } catch (error) {
    console.log(
      "Examiner account was not created. It may already exist.",
      error instanceof Error ? error.message : error,
    );
  }
  process.exit(0);
};

run();
