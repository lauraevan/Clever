/** Demo student identity. No real account data is used anywhere in this app. */
export const student = {
  firstName: "Alex",
  lastName: "Morgan",
  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  },
  initials: "AM",
  grade: "7th Grade",
  school: "Demo Middle School",
  district: "Demo Unified School District",
  /** Clever Badge / login demo values. Not credentials for any real service. */
  username: "alex.morgan",
} as const;
