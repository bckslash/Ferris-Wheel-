// CRT Shader with Optimizations and Readability Improvements

vec2 curve(vec2 uv) {
    uv = (uv - 0.5) * 2.0;
    uv *= 1.1;
    uv.x *= 1.0 + pow(abs(uv.y) / 5.0, 2.0);
    uv.y *= 1.0 + pow(abs(uv.x) / 4.0, 2.0);
    uv = (uv / 2.0) + 0.5;
    uv = uv * 0.92 + 0.04;
    return uv;
}

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    vec2 q = fragCoord.xy / iResolution.xy;
    vec2 uv = curve(q);

    // Original color from input texture
    vec3 originalColor = texture(iChannel0, q).xyz;
    vec3 color;

    // RGB Channel Offsets
    float xOffset = sin(0.3 * iTime + uv.y * 21.0) *
                    sin(0.7 * iTime + uv.y * 29.0) *
                    sin(0.3 + 0.33 * iTime + uv.y * 31.0) * 0.0017;

    color.r = texture(iChannel0, vec2(uv.x + xOffset + 0.001, uv.y + 0.001)).x + 0.05;
    color.g = texture(iChannel0, vec2(uv.x + xOffset, uv.y - 0.002)).y + 0.05;
    color.b = texture(iChannel0, vec2(uv.x + xOffset - 0.002, uv.y)).z + 0.05;

    // Additional Sampling for RGB Enhancements
    color.r += 0.08 * texture(iChannel0, 0.75 * vec2(xOffset + 0.025, -0.027) + uv).x;
    color.g += 0.05 * texture(iChannel0, 0.75 * vec2(xOffset - 0.022, -0.020) + uv).y;
    color.b += 0.08 * texture(iChannel0, 0.75 * vec2(xOffset - 0.020, -0.018) + uv).z;

    // Color Processing
    color = clamp(color * 0.6 + 0.4 * color * color * 1.0, 0.0, 1.0);

    // Vignette Effect
    float vignette = 16.0 * uv.x * uv.y * (1.0 - uv.x) * (1.0 - uv.y);
    color *= vec3(pow(vignette, 0.3));

    // Tint and Brightness Adjustments
    color *= vec3(0.95, 1.05, 0.95);
    color *= 2.8;

    // Scanline Effect
    float scanlines = clamp(0.35 + 0.35 * sin(3.5 * iTime + uv.y * iResolution.y * 1.5), 0.0, 1.0);
    float scanStrength = pow(scanlines, 1.7);
    color *= vec3(0.4 + 0.7 * scanStrength);

    // Flickering Effect
    color *= 1.0 + 0.01 * sin(110.0 * iTime);

    // Screen Borders
    if (uv.x < 0.0 || uv.x > 1.0 || uv.y < 0.0 || uv.y > 1.0) {
        color *= 0.0;
    }

    // Vertical Line Effect
    color *= 1.0 - 0.65 * vec3(clamp((mod(fragCoord.x, 2.0) - 1.0) * 2.0, 0.0, 1.0));

    // Optional Cross-Fade with Original Image (Uncomment to Enable)
    // float mixFactor = smoothstep(0.1, 0.9, sin(iTime));
    // color = mix(color, originalColor, mixFactor);

    fragColor = vec4(color, 1.0);
}