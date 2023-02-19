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
  MovieControl,
  TicketType,
} from '../../admin.interface';
import { AdminPanelService } from '../../admin.service';

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
  private adminPanelService = inject(AdminPanelService);

  addShowForm = this.createForm();
  matcher = new MyErrorStateMatcher();
  today = new Date();

  selectedMovieId!: number;
  selectedScreen!: string;
  ticketTypes: TicketType[] = [
    { type: 'Ulgowy' },
    { type: 'Senior' },
    { type: 'Normalny' },
  ];

  getLastDayOfWeek() {
    let day = this.today.getDate() - this.today.getDay() + 6;
    let lastDay = new Date(this.today.setDate(day));

    return lastDay;
  }

  // nextweek() {
  //   let today = new Date();
  //   let nextweek = new Date(
  //     today.getFullYear(),
  //     today.getMonth(),
  //     today.getDate() + 6
  //   );
  //   return nextweek;
  // }

  addPriceListItem() {
    if (this.addShowForm.controls.priceList.length === 3) return;
    this.addShowForm.controls.priceList.push(this.createPriceListForm());
  }

  removePriceListItem(index: number) {
    if (this.addShowForm.controls.priceList.length === 1) return;
    this.addShowForm.controls.priceList.removeAt(index);
  }

  handleSubmit() {
    let pickedDate = new Date(this.dayCtrl.value);
    let day = pickedDate.getUTCDay();
    if (
      this.adminPanelService
        .isDateAvaible(
          this.hourCtrl.value,
          this.movieIdCtrl.value.movieLength,
          day,
          this.screenCtrl.value
        )
        .subscribe(console.log)
    ) {
      console.log('mozna dodac');
    }
    console.log(this.addShowForm.value);
    console.log(day);
  }

  private createForm() {
    return this.builder.group<AddShowForm>({
      movieId: this.builder.control({} as MovieControl, {
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
      type: this.builder.control('', {
        validators: [Validators.required],
      }),
      price: this.builder.control(null, {
        validators: [
          Validators.required,
          Validators.min(10),
          Validators.max(50),
        ],
      }),
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

  ngOnInit() {}
}
