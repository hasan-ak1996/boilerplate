import { Component ,forwardRef, HostBinding, Input} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR ,FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'custom-attachment',
  templateUrl: './custom-attachment.component.html',
  styleUrls: ['./custom-attachment.component.css'],
  providers: [     
    {       provide: NG_VALUE_ACCESSOR, 
            useExisting: forwardRef(() => CustomAttachmentComponent),
            multi: true     
    } 
  ]
})
export class CustomAttachmentComponent implements ControlValueAccessor  {

  constructor() { }
  onChange: any = () => {}
  onTouch: any = () => {}
  val= ""

  set value(val){
    if( val !== undefined && this.val !== val){
    this.val = val
    this.onChange(val)
    this.onTouch(val);
    
    }
  }

  writeValue(value: any): void {
    this.value = value;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn
  }
  setDisabledState?(isDisabled: boolean): void {
    throw new Error('Method not implemented.');
  }


}
