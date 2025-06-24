import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../shared/services/product.service';
import { User } from '../../shared/interface/user.interface';
import { UserService } from '../../shared/services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss',
})
export class AddProductComponent {
  productForm: FormGroup = new FormGroup({});

  imageString: string | null = null;

  user: User | null = null;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private userService: UserService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.productForm = this.fb.group({
      productName: ['', [Validators.required, Validators.minLength(1)]],
      description: ['', [Validators.required, Validators.minLength(5)]],
      price: ['', [Validators.required, Validators.min(1)]],
      quantity: ['', [Validators.required, Validators.min(1)]],
      image: [null, Validators.required],
    });
    this.user = this.userService.getUser();
  }

  onSubmit() {
    if (this.productForm.valid && this.user?.id) {
      const formData = new FormData();
      formData.append('name', this.productForm.get('productName')?.value);
      formData.append(
        'description',
        this.productForm.get('description')?.value
      );
      formData.append('price', this.productForm.get('price')?.value);
      formData.append('quantity', this.productForm.get('quantity')?.value);
      formData.append('image', this.productForm.get('image')?.value);
      formData.append('sellerId', this.user.id.toString());
      this.productService.addProduct(formData).subscribe((data) => {});
      this.toastr.success('product added successfully');

      this.productForm.reset(null, { emitEvent: false });

      this.productForm.markAsPristine();
      this.productForm.markAsUntouched();
      this.imageString = null;
    }
  }

  onImageChange($event: Event) {
    const file = ($event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.productForm.patchValue({ image: file });
      this.productForm.get('image')?.updateValueAndValidity();
      const reader = new FileReader();
      reader.onload = () => {
        this.imageString = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }
}
