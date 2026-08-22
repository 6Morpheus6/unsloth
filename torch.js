const studioEnv = {
  HOME: "{{path.resolve(cwd, 'app')}}",
  USERPROFILE: "{{path.resolve(cwd, 'app')}}"
}

const venv = "{{args && args.venv ? args.venv : '../env'}}"
const venvPython = "{{args && args.venv_python ? args.venv_python : '3.12'}}"
const appPath = "{{args && args.path ? args.path : 'app'}}"

module.exports = {
  run: [
    {
      when: "{{gpu === 'nvidia' && platform === 'win32'}}",
      method: "shell.run",
      params: {
        venv,
        venv_python: venvPython,
        path: appPath,
        env: studioEnv,
        message: [
          "uv pip install torch==2.11.0 torchvision==0.26.0 torchaudio==2.11.0 --index-url https://download.pytorch.org/whl/cu130 --force-reinstall --no-deps",
        ]
      },
      next: null
    },
    {
      when: "{{gpu === 'nvidia' && platform === 'linux'}}",
      method: "shell.run",
      params: {
        bluefairy: "off",
        venv,
        venv_python: venvPython,
        path: appPath,
        env: studioEnv,
        message: [
        "uv pip install torch==2.11.0 torchvision==0.26.0 torchaudio==2.11.0 --index-url https://download.pytorch.org/whl/cu130 --force-reinstall"
        ]
      },
      next: null
    },
    // RDNA 1 (5000s)
    {
      when: "{{platform === 'win32' && gpu === 'amd' && /^gfx101[012]$/.test(gpu_target)}}",
      method: "shell.run",
      params: {
        bluefairy: "off",
        env: { "UV_SKIP_WHEEL_FILENAME_CHECK": "1" },
        venv_python: "{{args && args.venv_python ? args.venv_python : null}}",
        venv: "{{args && args.venv ? args.venv : null}}",
        path: "{{args && args.path ? args.path : '.'}}",
        message: "uv pip install torch==2.11.0 torchvision torchaudio --index-url https://rocm.nightlies.amd.com/v2-staging/gfx101X-dgpu --force-reinstall"
      },
      next: null
    },
    // RDNA 2 (6000s)
    {
      when: "{{platform === 'win32' && gpu === 'amd' && /^gfx103[0124]$/.test(gpu_target)}}",
      method: "shell.run",
      params: {
        bluefairy: "off",
        env: { "UV_SKIP_WHEEL_FILENAME_CHECK": "1" },
        venv_python: "{{args && args.venv_python ? args.venv_python : null}}",
        venv: "{{args && args.venv ? args.venv : null}}",
        path: "{{args && args.path ? args.path : '.'}}",
        message: "uv pip install torch==2.11.0 torchvision torchaudio --index-url https://rocm.nightlies.amd.com/v2-staging/gfx103X-dgpu --force-reinstall"
      },
      next: null
    },
    // RDNA 3 (7000/8000s)
    {
      when: "{{platform === 'win32' && gpu === 'amd' && /^gfx110[012]$/.test(gpu_target)}}",
      method: "shell.run",
      params: {
        bluefairy: "off",
        env: { "UV_SKIP_WHEEL_FILENAME_CHECK": "1" },
        venv_python: "{{args && args.venv_python ? args.venv_python : null}}",
        venv: "{{args && args.venv ? args.venv : null}}",
        path: "{{args && args.path ? args.path : '.'}}",
        message: "uv pip install torch==2.11.0 torchvision torchaudio --index-url https://rocm.nightlies.amd.com/v2-staging/gfx110X-all --force-reinstall"
      },
      next: null
    },
    // RDNA 4 (9000s)
    {
      when: "{{platform === 'win32' && gpu === 'amd' && /^gfx120[01]$/.test(gpu_target)}}",
      method: "shell.run",
      params: {
        bluefairy: "off",
        env: { "UV_SKIP_WHEEL_FILENAME_CHECK": "1" },
        venv_python: "{{args && args.venv_python ? args.venv_python : null}}",
        venv: "{{args && args.venv ? args.venv : null}}",
        path: "{{args && args.path ? args.path : '.'}}",
        message: "uv pip install torch==2.11.0 torchvision torchaudio --index-url https://rocm.nightlies.amd.com/v2-staging/gfx120X-all --force-reinstall"
      },
      next: null
    },
    // STRIX POINT (880M/890M / gfx1150)
    {
      when: "{{platform === 'win32' && gpu === 'amd' && /^gfx1150$/.test(gpu_target)}}",
      method: "shell.run",
      params: {
        bluefairy: "off",
        env: { "UV_SKIP_WHEEL_FILENAME_CHECK": "1" },
        venv_python: "{{args && args.venv_python ? args.venv_python : null}}",
        venv: "{{args && args.venv ? args.venv : null}}",
        path: "{{args && args.path ? args.path : '.'}}",
        message: "uv pip install torch==2.11.0 torchvision torchaudio --index-url https://rocm.nightlies.amd.com/v2-staging/gfx1150 --force-reinstall"
      },
      next: null
    },
    // STRIX HALO (8060s / gfx1151)
    {
      when: "{{platform === 'win32' && gpu === 'amd' && /^gfx1151$/.test(gpu_target)}}",
      method: "shell.run",
      params: {
        bluefairy: "off",
        env: { "UV_SKIP_WHEEL_FILENAME_CHECK": "1" },
        venv_python: "{{args && args.venv_python ? args.venv_python : null}}",
        venv: "{{args && args.venv ? args.venv : null}}",
        path: "{{args && args.path ? args.path : '.'}}",
        message: "uv pip install torch==2.11.0 torchvision torchaudio --index-url https://rocm.nightlies.amd.com/v2-staging/gfx1151 --force-reinstall"
      },
      next: null
    },
    {
      when: "{{gpu === 'amd' && platform === 'linux'}}",
      method: "shell.run",
      params: {
        bluefairy: "off",
        venv,
        venv_python: venvPython,
        path: appPath,
        env: studioEnv,
        message: [
          "uv pip install torch==2.11.0 torchvision==0.26.0 torchaudio==2.11.0 --index-url https://download.pytorch.org/whl/rocm7.2 --force-reinstall"
        ]
      },
      next: null
    },
    {
      when: "{{platform === 'darwin' && arch === 'arm64'}}",
      method: "shell.run",
      params: {
        venv,
        venv_python: venvPython,
        path: appPath,
        env: studioEnv,
        message: [
          "uv pip install torch==2.11.0 torchvision==0.26.0 torchaudio==2.11.0 --index-url https://download.pytorch.org/whl/cpu --force-reinstall --no-deps"
        ]
      },
      next: null
    },
    {
      when: "{{platform === 'darwin' && arch !== 'arm64'}}",
      method: "shell.run",
      params: {
        venv,
        venv_python: venvPython,
        path: appPath,
        env: studioEnv,
        message: [
          "uv pip install torch==2.2.2 torchvision==0.17.2 torchaudio==2.2.2 --index-url https://download.pytorch.org/whl/cpu --force-reinstall --no-deps"
        ]
      },
      next: null
    },
    {
      method: "shell.run",
      params: {
        venv,
        venv_python: venvPython,
        path: appPath,
        env: studioEnv,
        message: [
          "uv pip install torch==2.11.0 torchvision==0.26.0 torchaudio==2.11.0 --index-url https://download.pytorch.org/whl/cpu --force-reinstall --no-deps"
        ]
      }
    }
  ]
}
