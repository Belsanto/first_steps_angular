import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { OnExit } from './../../../../guards/exit.guard';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnExit {

  constructor() { }

  onExit(){
    const confirm = Swal.fire({
      title: 'Are you sure?',
      showDenyButton: true,
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed) {
        return true;
      }
      return false
    });
    return confirm

  }

}
