import { BadRequestException, PipeTransform } from '@nestjs/common';

// import { TaskStatus } from '../tasks.model';

// export class TaskStatusValidationPipe implements PipeTransform {

//   readonly allowStatuses: string[] = [
//     TaskStatus.OPEN,
//     TaskStatus.IN_PROGRESS,
//     TaskStatus.DONE,
//   ];

//   transform(value: string): any {
//     value = value.toUpperCase();

//     if (!this.isStatusValid(value)) {
//       throw new BadRequestException(`${value} is an invalid value`)
//     }

//     return value;
//   }

//   private isStatusValid(status: string): boolean {
//     return this.allowStatuses.indexOf(status) !== -1;
//   }
// }
