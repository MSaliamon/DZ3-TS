
interface Lecturer {
  fullName: string;
  area: Area;
  addArea(area: Area): void;
  removeArea(area: Area): void;
}



class School {
  private _areas: Area[] = [];
  private _lecturers: Lecturer[] = [];

  get areas(): Area[] {
  return this._areas;
  }

   get lecturers(): Lecturer[] {
  return this._lecturers;
  }

  addArea(area: Area): void {
  this._areas.push(area);
  
  }
  removeArea(area: Area): void {
  this._areas = this._areas.filter(a => a !== area);
  }

  addLecturer(lecturer: Lecturer): void {
  this._lecturers.push(lecturer);
  }

  removeLecturer(lecturer: Lecturer): void {
  this._lecturers = this._lecturers.filter(l => l !== lecturer);
  }
}

class Area {
  private _levels: Level[] = [];
  private _name: string;

  constructor(name: string) {
  this._name = name;
  }

  get levels(): Level[] {
  return this._levels;
  }

  addLevel(level: Level): void {
  this._levels.push(level);
  }

  removeLevel(level: Level): void {
  this._levels = this._levels.filter(l => l !== level);
  }
}

class Level {
  private _groups: Group[] = [];
  private _name: string;
  private _description: string;

  constructor(name: string, description: string) {
  this._name = name;
  this._description = description;
  }

  get groups(): Group[] {
  return this._groups;
  }

  addGroup(group: Group): void {
  this._groups.push(group);
  }

  removeGroup(group: Group): void {
  this._groups = this._groups.filter(g => g !== group);
  }
}

class Group {
  private _area: Area;
  private _status: string;
  private _students: Student[] = [];

  constructor(private directionName: string, private levelName: string, area: Area) {
  
  this._area = area;
  this._status = 'not started';
  }

  get area(): Area {
  return this._area;
  }

  set area(area: Area) {
  this._area = area;
  }

  get status(): string {
  return this._status;
  }

  set status(status: string) {
  this._status = status;
  }

  get students(): Student[] {
  return this._students;
  }

  addStudent(student: Student): void {
  this._students.push(student);
  }

  removeStudent(student: Student): void {
  this._students = this._students.filter(s => s !== student);
  }

  showPerformance(): Student[] {
  const sortedStudents = this._students.sort((a, b) => b.getPerformanceRating() - a.getPerformanceRating());
  return sortedStudents;
  }
}

class Student {
  private _grades: { [workName: string]: number } = {};
  private _visits: { [lesson: string]: boolean } = {};
  private _fullName: string;
  private _lastName: string;
  private _firstName: string = '';
  private _birthYear: number;


  constructor(firstName: string, lastName: string, birthYear: number) {
    this._fullName = `${lastName} ${firstName}`;
    this._birthYear = birthYear;
    this._lastName = '';
    
  }

  get fullName(): string {
  return this._fullName;
  }

  set fullName(value: string) {
  [this._lastName, this._firstName] = value.split(' ');
  }

  get age(): number {
  return new Date().getFullYear() - this._birthYear;
  }

  setGrade(workName: string, mark: number): void {
  this._grades[workName] = mark;
  }

  setVisit(lesson: string, present: boolean): void {
  this._visits[lesson] = present;
  }

  getPerformanceRating(): number {
  const gradeValues = Object.values(this._grades);

  if (!gradeValues.length) return 0;

  const averageGrade = gradeValues.reduce((sum, grade) => sum + grade, 0) / gradeValues.length;
  const attendancePercentage = (Object.values(this._visits).filter(present => present).length / Object.values(this._visits).length) * 100;

  return (averageGrade + attendancePercentage) / 2;
  }
}