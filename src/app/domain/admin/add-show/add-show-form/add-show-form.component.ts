import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import {
  AddPriceListItem,
  AddShowForm,
  FetchedMovie,
  FetchedScreen,
} from '../../admin.interface';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: 'app-add-show-form[movies][screens]',
  templateUrl: './add-show-form.component.html',
  styleUrls: ['./add-show-form.component.scss'],
})
export class AddShowFormComponent {
  @Input() movies!: FetchedMovie[];
  @Input() screens!: FetchedScreen[];
  @Output() handleSubmitEvent = new EventEmitter<string>();

  private builder = inject(NonNullableFormBuilder);
  addShowForm = this.createForm();

  matcher = new MyErrorStateMatcher();
  today = new Date();

  selectedMovieId!: number;
  selectedScreen!: string;

  nextweek() {
    let today = new Date();
    let nextweek = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + 7
    );
    return nextweek;
  }

  addPriceListItem() {
    this.addShowForm.controls.priceList.push(this.createPriceListForm());
  }

  handleSubmit() {
    let pickedDate = new Date(this.dayCtrl.value);
    let day = pickedDate.getUTCDay();
    console.log(this.addShowForm.value);
    console.log(day);
  }

  private createForm() {
    return this.builder.group<AddShowForm>({
      movieId: this.builder.control(null, {
        validators: [Validators.required],
      }),
      hour: this.builder.control('', {
        validators: [Validators.required],
      }),
      day: this.builder.control('', {
        validators: [Validators.required],
      }),
      screen: this.builder.control('', {
        validators: [Validators.required],
      }),
      priceList: this.builder.array<FormGroup<AddPriceListItem>>([
        this.createPriceListForm(),
      ]),
    });
  }

  private createPriceListForm() {
    return this.builder.group<AddPriceListItem>({
      type: this.builder.control(''),
      price: this.builder.control(null),
    });
  }

  get movieIdCtrl() {
    return this.addShowForm.controls.movieId;
  }

  get hourCtrl() {
    return this.addShowForm.controls.hour;
  }

  get dayCtrl() {
    return this.addShowForm.controls.day;
  }

  get screenCtrl() {
    return this.addShowForm.controls.screen;
  }

  ngOnInit() {
    console.log(this.nextweek());
  }
}
