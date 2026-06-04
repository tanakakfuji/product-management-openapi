package com.github.tanakakfuji.api.form;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class ProductForm {
    @NotBlank
    private String name;

    @NotBlank
    private String description;

    @NotNull
    @Min(0)
    @Max(1000000)
    private Integer price;
}
